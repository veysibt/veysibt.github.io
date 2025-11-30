import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Trash2, Calendar, Clock, BookOpen, Crown, Coffee, Sparkles } from 'lucide-react';
import { DAYS, TIME_SLOTS, LUNCH_BREAK_INDEX } from './constants';
import { ScheduleData } from './types';
import { ScheduleInput } from './components/ScheduleInput';

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [title, setTitle] = useState("Haftalık Ders Programım");
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (dayIndex: number, periodIndex: number, value: string) => {
    const key = `${dayIndex}-${periodIndex}`;
    setSchedule(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearAll = () => {
    if (window.confirm('Tüm programı silmek istediğinize emin misiniz?')) {
      setSchedule({});
    }
  };

  const handleDownload = async () => {
    if (!printRef.current) return;
    
    setIsExporting(true);
    // Wait for render cycle to complete any visual updates
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 3, // High resolution
        backgroundColor: '#0E0D0B', // Matches main background
        useCORS: true,
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${title.replace(/\s+/g, '_')}_Ders_Programi.png`;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Görüntü oluşturulurken bir hata oluştu.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0D0B] flex flex-col items-center py-8 px-4 font-sans text-[#F5E9CF] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1816] via-[#0E0D0B] to-[#000000]">
      
      {/* Control Bar */}
      <div className="w-full max-w-7xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1A1816]/90 backdrop-blur-md p-6 rounded-none md:rounded-2xl shadow-2xl border border-[#24221F] relative overflow-hidden">
        {/* Decorative background accent for control bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C6A667] via-[#F2D8A7] to-[#C6A667]"></div>
        
        <div className="flex items-center gap-5 z-10">
            <div className="bg-[#24221F] p-4 rounded-xl text-[#C6A667] ring-1 ring-[#C6A667]/20 shadow-[0_0_20px_-10px_rgba(198,166,103,0.3)]">
                <Crown size={28} strokeWidth={2} className="animate-pulse" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-[#F5E9CF] tracking-wide uppercase font-sans">Ders Programı</h1>
                <p className="text-[#F2D8A7] text-xs font-bold tracking-[0.25em] mt-1 uppercase">Warm Dark Edition</p>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto z-10">
             <button
                onClick={handleClearAll}
                className="flex items-center justify-center gap-2 px-6 py-4 text-[#F2D8A7] hover:text-[#FFF] bg-transparent hover:bg-[#24221F] border border-[#C6A667]/40 hover:border-[#C6A667] rounded-xl transition-all font-bold text-sm w-full md:w-auto group tracking-widest uppercase shadow-[0_0_15px_-8px_rgba(198,166,103,0.4)]"
            >
                <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                Temizle
            </button>
            <button
                onClick={handleDownload}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#C6A667] text-[#0E0D0B] hover:bg-[#D4B475] rounded-xl shadow-[0_0_25px_-5px_rgba(198,166,103,0.5)] hover:shadow-[0_0_35px_-5px_rgba(198,166,103,0.7)] transition-all font-black text-sm w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] uppercase tracking-wide"
            >
                {isExporting ? (
                    <span className="flex items-center gap-2">
                         <div className="w-4 h-4 border-2 border-[#0E0D0B]/30 border-t-[#0E0D0B] rounded-full animate-spin"></div>
                         Oluşturuluyor...
                    </span>
                ) : (
                    <>
                        <Download size={20} strokeWidth={3} />
                        PNG İndir
                    </>
                )}
            </button>
        </div>
      </div>

      {/* Schedule Canvas Wrapper */}
      <div className="w-full overflow-x-auto pb-12 flex justify-center custom-scrollbar">
        <div 
          ref={printRef} 
          className="bg-[#0E0D0B] p-8 md:p-12 rounded-3xl shadow-2xl min-w-[1200px] max-w-7xl mx-auto relative overflow-hidden border border-[#24221F]"
        >
          {/* Decorative Background Elements (Warm Glows) */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C6A667]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F2D8A7]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-[#C6A667]/3 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

          {/* Title Section */}
          <div className="mb-14 text-center space-y-6 relative z-10">
            <div className="inline-block relative group w-full max-w-4xl">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C6A667] via-[#F5E9CF] to-[#F2D8A7] text-center w-full bg-transparent focus:outline-none rounded-xl py-4 px-6 transition-all placeholder-[#24221F] tracking-tight uppercase drop-shadow-sm"
                    placeholder="PROGRAM BAŞLIĞI"
                />
            </div>
             <div className="flex items-center justify-center gap-6 text-[#F2D8A7] font-bold text-xs tracking-[0.4em] uppercase opacity-90">
                <span className="w-16 h-[2px] bg-[#F2D8A7]/30 rounded-full"></span>
                2024 - 2025 EĞİTİM DÖNEMİ
                <span className="w-16 h-[2px] bg-[#F2D8A7]/30 rounded-full"></span>
             </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-[160px_repeat(5,1fr)] gap-4 relative z-10">
            
            {/* Header Row */}
            <div className="bg-[#24221F] text-[#C6A667] rounded-2xl flex items-center justify-center p-6 border border-[#24221F]/50 shadow-lg">
                <Clock size={32} strokeWidth={2} />
            </div>
            {DAYS.map((day) => (
                <div key={day} className="bg-[#24221F] text-[#F2D8A7] border border-[#24221F]/50 rounded-2xl flex items-center justify-center p-6 font-black text-lg uppercase tracking-wider shadow-lg shadow-black/20">
                    <span className="">{day}</span>
                </div>
            ))}

            {/* Schedule Rows */}
            {TIME_SLOTS.map((slot, index) => {
                const isLunchNext = index === LUNCH_BREAK_INDEX;

                return (
                    <React.Fragment key={slot.period}>
                        {/* Lunch Break Row */}
                        {isLunchNext && (
                             <div className="col-span-6 bg-[#24221F]/50 border border-[#C6A667]/30 rounded-2xl text-[#C6A667] py-6 flex items-center justify-center gap-10 my-4 relative overflow-hidden backdrop-blur-sm">
                                <span className="font-black italic tracking-widest text-lg flex items-center gap-4 z-10 uppercase">
                                    <Coffee size={24} strokeWidth={2.5} />
                                    Öğle Arası
                                    <Coffee size={24} strokeWidth={2.5} />
                                </span>
                                <span className="text-[#F5E9CF] text-sm font-mono border border-[#C6A667]/50 px-4 py-2 rounded-lg bg-[#C6A667]/10 font-bold">
                                    12:25 - 13:00
                                </span>
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A667]/10 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                             </div>
                        )}

                        {/* Time Slot Cell - HUGE */}
                        <div className="bg-[#24221F] rounded-2xl border border-[#24221F]/50 flex flex-col items-center justify-center p-4 relative select-none min-h-[140px] group">
                            <div className="absolute top-3 left-3 bg-[#1A1816] text-[#C6A667] text-xs font-black px-3 py-1.5 rounded-lg border border-[#C6A667]/20">
                                {slot.period}. DERS
                            </div>
                            
                            <div className="flex flex-col items-center justify-center pt-4 w-full">
                                {/* Start Time - Massive */}
                                <div className="text-5xl font-black text-[#C6A667] tracking-tighter leading-none">{slot.start}</div>
                                
                                {/* Divider */}
                                <div className="w-12 h-1 bg-[#24221F] rounded-full my-3 group-hover:w-full group-hover:bg-[#C6A667]/30 transition-all duration-300"></div>
                                
                                {/* End Time - Large */}
                                <div className="text-xl font-bold text-[#C6A667]/60">{slot.end}</div>
                            </div>
                        </div>

                        {/* Input Cells for Each Day */}
                        {DAYS.map((_, dayIndex) => {
                             const key = `${dayIndex}-${slot.period}`;
                             const hasContent = !!schedule[key];

                             return (
                                <div 
                                    key={key} 
                                    className={`
                                        flex flex-col rounded-2xl border-2 transition-all relative overflow-hidden group min-h-[inherit] p-1
                                        ${hasContent 
                                            ? 'bg-[#24221F] border-[#C6A667] shadow-[0_0_20px_rgba(198,166,103,0.15)]' 
                                            : 'bg-[#1A1816] border-transparent hover:bg-[#24221F] hover:border-[#F2D8A7]/30'
                                        }
                                        focus-within:border-[#C6A667] focus-within:bg-[#24221F] focus-within:shadow-[0_0_30px_rgba(198,166,103,0.2)]
                                    `}
                                >
                                    <ScheduleInput 
                                        value={schedule[key] || ''} 
                                        onChange={(val) => handleInputChange(dayIndex, slot.period, val)}
                                        placeholder=""
                                    />
                                    
                                    {/* Accent Corners for Content */}
                                    {hasContent && (
                                        <>
                                            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#C6A667]/20 to-transparent pointer-events-none rounded-tr-xl"></div>
                                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#F2D8A7]/20 to-transparent pointer-events-none rounded-bl-xl"></div>
                                        </>
                                    )}
                                </div>
                             );
                        })}
                    </React.Fragment>
                );
            })}

          </div>
            
          {/* Footer Info */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-[#F5E9CF]/40 text-xs font-bold px-6 border-t border-[#24221F] pt-8 gap-4">
            <div className="flex gap-8 font-mono uppercase tracking-wider">
                 <span className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#C6A667] shadow-[0_0_10px_#C6A667]"></span> 
                    Ders: <span className="text-[#F5E9CF]">40dk</span>
                 </span>
                 <span className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full border-2 border-[#F2D8A7]"></span> 
                    Teneffüs: <span className="text-[#F5E9CF]">10/15dk</span>
                 </span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#C6A667] transition-colors cursor-pointer">
                 <BookOpen size={16} />
                 <span className="font-black tracking-[0.2em] uppercase">dersprogrami.app</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;