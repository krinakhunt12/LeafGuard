import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Diagnosis } from '../api';

async function toDataUrl(blobUrl: string): Promise<string> {
    try {
        const res  = await fetch(blobUrl);
        const blob = await res.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror  = reject;
            reader.readAsDataURL(blob);
        });
    } catch { return ''; }
}

function buildReportNode(data: Diagnosis, imgDataUrl: string, date: string): HTMLDivElement {
    const healthy     = data.isHealthy;
    const accent      = healthy ? '#16a34a' : '#dc2626';
    const accentLight = healthy ? '#f0fdf4' : '#fff1f2';
    const accentText  = healthy ? '#15803d' : '#b91c1c';
    const statusLabel = healthy ? 'Healthy Leaf Detected' : 'Disease Detected';
    const riskLabel   = healthy ? 'LOW RISK' : 'CRITICAL';
    const riskBg      = healthy ? '#16a34a' : '#dc2626';
    const conf        = Math.round(data.confidence);

    const R    = 34;
    const CIRC = 2 * Math.PI * R;
    const dash = CIRC * (1 - data.confidence / 100);

    const treatmentRows = data.treatments.map((t, i) => `
        <div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;
                    border-bottom:1px solid #f1f5f9;">
            <div style="min-width:20px;height:20px;border-radius:50%;
                        background:#f0fdf4;border:1.5px solid #86efac;
                        display:flex;align-items:center;justify-content:center;
                        font-size:10px;font-weight:700;color:#16a34a;flex-shrink:0;margin-top:1px;">${i + 1}</div>
            <span style="font-size:12.5px;color:#475569;line-height:1.6;">${t}</span>
        </div>`).join('');

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `width:794px;position:fixed;top:-9999px;left:-9999px;z-index:-1;`;

    wrapper.innerHTML = `
    <div style="width:794px;background:#fff;font-family:'Inter',system-ui,sans-serif;color:#1e293b;">

      <!-- HEADER -->
      <div style="background:#0f172a;padding:22px 36px;display:flex;
                  align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:11px;">
          <div style="width:38px;height:38px;border-radius:9px;
                      background:rgba(22,163,74,.22);border:1px solid rgba(22,163,74,.35);
                      display:flex;align-items:center;justify-content:center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#fff;letter-spacing:-.3px;
                        font-family:'Outfit',system-ui,sans-serif;">LeafGuard</div>
            <div style="font-size:10px;color:#475569;letter-spacing:.1em;margin-top:1px;">AI PLANT DIAGNOSTICS</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:9.5px;color:#64748b;letter-spacing:.1em;
                      text-transform:uppercase;margin-bottom:4px;">Diagnostic Report</div>
          <div style="font-size:12px;color:#94a3b8;font-weight:500;">${date}</div>
        </div>
      </div>

      <!-- STATUS BAR -->
      <div style="background:${accentLight};border-bottom:2px solid ${accent};
                  padding:11px 36px;display:flex;align-items:center;gap:9px;">
        <div style="width:8px;height:8px;border-radius:50%;
                    background:${accent};flex-shrink:0;"></div>
        <span style="font-size:11px;font-weight:700;color:${accentText};
                     letter-spacing:.12em;text-transform:uppercase;">${statusLabel}</span>
        <span style="margin-left:auto;background:${riskBg};color:#fff;
                     padding:3px 12px;border-radius:20px;font-size:10px;
                     font-weight:700;letter-spacing:.1em;">${riskLabel}</span>
      </div>

      <!-- BODY -->
      <div style="padding:28px 36px 32px;">

        <!-- Disease + badges -->
        <div style="margin-bottom:20px;">
          <div style="font-size:26px;font-weight:800;color:#0f172a;line-height:1.15;
                      margin-bottom:10px;font-family:'Outfit',system-ui,sans-serif;
                      word-break:break-word;">${data.diseaseName}</div>
          <div style="display:flex;gap:7px;align-items:center;">
            <span style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;
                         padding:3px 10px;border-radius:5px;font-size:10.5px;font-weight:700;
                         letter-spacing:.04em;">AI DIAGNOSIS</span>
            <span style="background:#f8fafc;color:#64748b;border:1px solid #e2e8f0;
                         padding:3px 10px;border-radius:5px;font-size:10.5px;font-weight:500;">
                Verified Methodology</span>
          </div>
        </div>

        <!-- Two-column: image left, stats right -->
        <div style="display:flex;gap:20px;margin-bottom:22px;align-items:stretch;">

          ${imgDataUrl ? `
          <div style="flex:1;border-radius:10px;overflow:hidden;
                      border:1px solid #e2e8f0;min-height:190px;">
            <img src="${imgDataUrl}"
                 style="width:100%;height:190px;object-fit:cover;display:block;" />
          </div>` : '<div style="flex:1"></div>'}

          <!-- Right stats column -->
          <div style="width:205px;display:flex;flex-direction:column;gap:14px;flex-shrink:0;">

            <!-- Confidence card -->
            <div style="background:#0f172a;border-radius:10px;padding:16px 18px;
                        display:flex;align-items:center;gap:14px;flex:1;">
              <div style="position:relative;width:72px;height:72px;flex-shrink:0;">
                <svg width="72" height="72" viewBox="0 0 76 76"
                     style="transform:rotate(-90deg);display:block;">
                  <circle cx="38" cy="38" r="${R}" stroke="#1e293b"
                          stroke-width="6" fill="none"/>
                  <circle cx="38" cy="38" r="${R}" stroke="#4ade80"
                          stroke-width="6" fill="none"
                          stroke-dasharray="${CIRC.toFixed(1)}"
                          stroke-dashoffset="${dash.toFixed(1)}"
                          stroke-linecap="round"/>
                </svg>
                <div style="position:absolute;inset:0;display:flex;align-items:center;
                            justify-content:center;font-size:16px;font-weight:800;color:#fff;">
                  ${conf}%</div>
              </div>
              <div>
                <div style="font-size:9px;color:#64748b;text-transform:uppercase;
                            letter-spacing:.1em;margin-bottom:5px;">Confidence Score</div>
                <div style="font-size:13px;font-weight:700;color:#4ade80;
                            line-height:1.3;">High<br/>Precision</div>
              </div>
            </div>

            <!-- Alert / healthy card -->
            ${!healthy ? `
            <div style="background:#fefce8;border:1px solid #fde047;
                        border-radius:10px;padding:13px 14px;">
              <div style="font-size:10px;font-weight:700;color:#854d0e;
                          letter-spacing:.04em;margin-bottom:6px;">TIME TO ACTION</div>
              <div style="font-size:12px;font-weight:700;color:#92400e;
                          margin-bottom:5px;">Act within 48 hours</div>
              <div style="font-size:11px;color:#a16207;line-height:1.5;">
                Pathogen spreads via wind or water to adjacent crops.</div>
            </div>` : `
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;
                        border-radius:10px;padding:13px 14px;">
              <div style="font-size:10px;font-weight:700;color:#15803d;
                          letter-spacing:.04em;margin-bottom:6px;">PLANT STATUS</div>
              <div style="font-size:12px;font-weight:700;color:#166534;margin-bottom:5px;">
                No Disease Found</div>
              <div style="font-size:11px;color:#15803d;line-height:1.5;">
                Continue standard care protocols.</div>
            </div>`}
          </div>
        </div>

        <!-- Divider -->
        <div style="border-top:1px solid #f1f5f9;margin-bottom:20px;"></div>

        <!-- Biological Impact -->
        <div style="margin-bottom:18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:9.5px;font-weight:700;text-transform:uppercase;
                         letter-spacing:.13em;color:#94a3b8;">Biological Impact</span>
            <div style="flex:1;height:1px;background:#f1f5f9;"></div>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;
                      padding:13px 16px;font-size:12.5px;color:#475569;line-height:1.7;">
            ${data.description}
          </div>
        </div>

        <!-- Treatment Protocol -->
        <div style="margin-bottom:18px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:9.5px;font-weight:700;text-transform:uppercase;
                         letter-spacing:.13em;color:#94a3b8;">Treatment Protocol</span>
            <div style="flex:1;height:1px;background:#f1f5f9;"></div>
          </div>
          <div style="border:1px solid #e2e8f0;border-radius:9px;
                      overflow:hidden;padding:2px 14px 4px;">
            ${treatmentRows}
          </div>
        </div>

        <!-- Hygiene Tip -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;
                    padding:13px 16px;">
          <div style="font-size:9.5px;font-weight:700;color:#1d4ed8;
                      text-transform:uppercase;letter-spacing:.1em;margin-bottom:7px;">
            Hygiene Tip</div>
          <div style="font-size:12.5px;color:#1e40af;line-height:1.65;">
            Sanitize all tools with 70% isopropyl alcohol after handling infected
            vegetation to prevent spread to healthy plants.
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="background:#f8fafc;border-top:1px solid #e2e8f0;
                  padding:14px 36px;display:flex;justify-content:space-between;
                  align-items:center;">
        <div style="font-size:10.5px;color:#94a3b8;">
          Generated by LeafGuard AI &middot; ${date}</div>
        <div style="font-size:10.5px;color:#cbd5e1;">
          AI-generated &mdash; consult an agronomist for critical decisions.</div>
      </div>

    </div>`;

    return wrapper;
}

export async function generatePdf(data: Diagnosis, previewUrl: string | null | undefined): Promise<void> {
    const imgDataUrl = previewUrl ? await toDataUrl(previewUrl) : '';
    const date = new Date().toLocaleString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    const node = buildReportNode(data, imgDataUrl, date);
    document.body.appendChild(node);

    try {
        const target = node.firstElementChild as HTMLElement;

        const canvas = await html2canvas(target, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            windowWidth: 794,
        });

        // A4 in mm
        const PAGE_W_MM = 210;
        const PAGE_H_MM = 297;
        const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

        const pxPerMm  = canvas.width / PAGE_W_MM;
        const pageHpx  = PAGE_H_MM * pxPerMm;
        let   offsetY  = 0;
        let   first    = true;

        while (offsetY < canvas.height) {
            if (!first) pdf.addPage();
            first = false;

            const sliceH = Math.min(pageHpx, canvas.height - offsetY);
            const tmp    = document.createElement('canvas');
            tmp.width    = canvas.width;
            tmp.height   = sliceH;
            tmp.getContext('2d')!.drawImage(canvas, 0, -offsetY);

            pdf.addImage(
                tmp.toDataURL('image/jpeg', 0.98),
                'JPEG', 0, 0,
                PAGE_W_MM, sliceH / pxPerMm
            );
            offsetY += pageHpx;
        }

        pdf.save(`LeafGuard_Report_${data.diseaseName.replace(/[\s()]/g, '_')}.pdf`);
    } finally {
        document.body.removeChild(node);
    }
}
