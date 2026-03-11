import os
import tensorflow as tf
from tensorflow.keras import layers
import numpy as np

# Configuration
IMAGE_SIZE = (128, 128)
BATCH_SIZE = 32
COLOR_MODE = 'rgb'
EPOCHS = 10
DATASET_PATH = '../Dataset'
MODEL_SAVE_PATH = 'plant_disease_model.h5'

def train_model():
    # Verify if the path exists
    if not os.path.exists(DATASET_PATH):
        print(f"Error: Dataset path '{DATASET_PATH}' not found.")
        return

    print(f"Loading dataset from: {DATASET_PATH}")

    # Create training dataset
    train_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_PATH,
        labels='inferred',
        label_mode='int',
        image_size=IMAGE_SIZE,
        interpolation='nearest',
        batch_size=BATCH_SIZE,
        shuffle=True,
        seed=42,
        validation_split=0.2,
        subset='training',
        color_mode=COLOR_MODE
    )

    class_names = train_ds.class_names
    num_classes = len(class_names)
    print(f"Class names: {class_names}")

    # Create validation dataset
    val_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_PATH,
        labels='inferred',
        label_mode='int',
        image_size=IMAGE_SIZE,
        interpolation='nearest',
        batch_size=BATCH_SIZE,
        shuffle=False,
        seed=42,
        validation_split=0.2,
        subset='validation',
        color_mode=COLOR_MODE
    )

    # Configure the datasets for performance
    AUTOTUNE = tf.data.AUTOTUNE
    
    # Data augmentation
    data_augmentation = tf.keras.Sequential([
        tf.keras.layers.Rescaling(1./255),
        tf.keras.layers.RandomFlip("horizontal_and_vertical"),
        tf.keras.layers.RandomRotation(0.2),
        tf.keras.layers.RandomZoom(0.2),
    ], name="data_augmentation_layer")

    def apply_augmentation(image, label):
        return data_augmentation(image, training=True), label

    rescale_layer = tf.keras.layers.Rescaling(1./255)
    def apply_rescaling(image, label):
        return rescale_layer(image), label

    train_ds = train_ds.map(apply_augmentation, num_parallel_calls=AUTOTUNE).cache().prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.map(apply_rescaling, num_parallel_calls=AUTOTUNE).cache().prefetch(buffer_size=AUTOTUNE)

    # Define the model architecture
    model = tf.keras.Sequential([
        layers.Input(shape=IMAGE_SIZE + (3,)),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])

    # Compile the model
    model.compile(
        optimizer='adam',
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
        metrics=['accuracy']
    )

    print("Starting model training...")
    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS
    )

    print(f"Saving model to {MODEL_SAVE_PATH}...")
    model.save(MODEL_SAVE_PATH)
    
    # Save class names for the API
    with open('class_names.txt', 'w') as f:
        for name in class_names:
            f.write(f"{name}\n")
    
    print("Training complete and model saved.")

if __name__ == "__main__":
    train_model()
