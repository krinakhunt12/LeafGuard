import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Layers, 
  Zap, 
  Shield, 
  Globe, 
  Microscope,
  Network
} from 'lucide-react';

const Technology: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const techSpecs = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Modified CNN Architecture",
      desc: "Our core engine uses a deep Convolutional Neural Network optimized specifically for botanical feature extraction and leaf pathology classification.",
      tags: ["ResNet-50", "Attention Layers", "Keras"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Vast Botanical Dataset",
      desc: "Trained on 85,000+ high-resolution, expert-annotated leaf samples across multiple species and climate variations.",
      tags: ["BigData", "Annotations", "High-Res"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Sub-second Inference",
      desc: "Quantized model weights and edge-optimized processing allow for diagnosis in under 500ms on standard mobile hardware.",
      tags: ["Quantization", "TFLite", "Edge-AI"]
    }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
            <Zap className="w-3 h-3" /> Technical Core
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            The Science Behind <br />
            <span className="text-gradient">Precision Agriculture</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            LeafGuard merges advanced neural computation with field-tested botanical pathology to provide instant, expert-level crop diagnostics.
          </p>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <div className="container mx-auto px-4 md:px-8 mb-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {techSpecs.map((spec, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-primary border border-slate-50">
                {spec.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{spec.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                {spec.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {spec.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-black text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detailed Science Section */}
      <div className="bg-slate-900 py-32 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  NeuralLesion™ <br />
                  <span className="text-primary">Recognition Engine</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Unlike generic image classifiers, LeafGuard utilizes our proprietary NeuralLesion™ engine. It specializes in distinguishing between subtle environmental stressors and biological pathogens.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Shield className="w-5 h-5" />, t: "Adversarial Robustness", d: "Built to ignore blur and lighting artifacts." },
                  { icon: <Globe className="w-5 h-5" />, t: "Global Locality", d: "Climate-aware diagnosis for specific regions." },
                  { icon: <Microscope className="w-5 h-5" />, t: "Fine-Grained Detail", d: "Detects lesion edges as small as 2mm." },
                  { icon: <Network className="w-5 h-5" />, t: "Cloud-Native", d: "Distributed GPU training for daily model updates." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-primary mb-3">{item.icon}</div>
                    <div className="text-white font-bold text-sm mb-1 uppercase tracking-tight">{item.t}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{item.d}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-1 rounded-[40px]">
                <div className="bg-slate-900 rounded-[39px] overflow-hidden border border-white/5 aspect-square flex items-center justify-center p-8">
                  {/* Conceptual AI visual */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                      <Cpu className="w-20 h-20 text-primary animate-bounce duration-[3000ms]" />
                      <div className="flex gap-4">
                        <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-primary" />
                        </div>
                        <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="h-full bg-blue-500" />
                        </div>
                      </div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                        Processing Feature Vectors<br />
                        <span className="text-primary">128.4 GFLOPS/sec</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating stats card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-2xl border border-slate-100 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-2 rounded-xl text-green-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Accuracy Score</div>
                    <div className="text-xl font-black text-slate-900">98.4%</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;
