import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const hubs = [
  { id: 'delhi', name: 'Delhi NCR Hub', x: 400, y: 250, type: 'Primary Hub' },
  { id: 'mumbai', name: 'Mumbai Facility', x: 250, y: 550, type: 'Primary Hub' },
  { id: 'bangalore', name: 'Bangalore Depot', x: 350, y: 750, type: 'Primary Hub' },
  { id: 'chennai', name: 'Chennai Port', x: 450, y: 720, type: 'Regional Hub' },
  { id: 'kolkata', name: 'Kolkata Center', x: 650, y: 450, type: 'Primary Hub' },
  { id: 'hyderabad', name: 'Hyderabad Hub', x: 400, y: 600, type: 'Regional Hub' },
  { id: 'ahmedabad', name: 'Ahmedabad Node', x: 200, y: 410, type: 'Regional Hub' },
  { id: 'jaipur', name: 'Jaipur Terminal', x: 320, y: 300, type: 'Transit Hub' },
  { id: 'kanpur', name: 'Kanpur Center', x: 480, y: 300, type: 'Transit Hub' },
  { id: 'guwahati', name: 'Guwahati Depot', x: 800, y: 350, type: 'Regional Hub' },
  { id: 'nagpur', name: 'Nagpur Core', x: 420, y: 450, type: 'Transit Hub' },
  { id: 'pune', name: 'Pune Terminal', x: 300, y: 580, type: 'Transit Hub' },
];

const routes = [
  ['delhi', 'jaipur'], ['delhi', 'kanpur'], ['delhi', 'ahmedabad'],
  ['ahmedabad', 'mumbai'], ['mumbai', 'pune'], ['pune', 'bangalore'],
  ['pune', 'hyderabad'], ['bangalore', 'chennai'], ['hyderabad', 'chennai'],
  ['hyderabad', 'nagpur'], ['nagpur', 'delhi'], ['nagpur', 'kolkata'],
  ['kolkata', 'kanpur'], ['kolkata', 'guwahati'], ['jaipur', 'ahmedabad']
];

export function OperationalMap() {
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  return (
    <div className="mt-24 pt-16 border-t border-white/5 relative hidden md:block">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-4">
          PAN-India <span className="text-ktc-accent-primary">Network</span>
        </h3>
        <p className="text-[#94A3B8] text-sm uppercase font-bold tracking-widest">
          Primary Service Regions & Major Hub Locations
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[600px] bg-[#111827] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        {/* Helper overlay for India map aesthetic */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 1000 1000" className="w-[800px] h-[800px]">
                <path d="M 400 100 C 500 100, 550 200, 600 300 C 700 350, 850 300, 900 400 C 850 500, 700 450, 650 550 C 600 700, 500 850, 450 900 C 400 950, 350 850, 300 750 C 250 650, 200 600, 150 500 C 100 400, 150 300, 200 350 C 300 300, 300 200, 400 100 Z" fill="none" stroke="#FF6B00" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
        </div>

        <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full">
          {/* Default Routes */}
          {routes.map(([source, target], i) => {
            const s = hubs.find(h => h.id === source);
            const t = hubs.find(h => h.id === target);
            if (!s || !t) return null;
            
            const isHoveredRoute = hoveredHub === source || hoveredHub === target;
            const isAnyHovered = hoveredHub !== null;
            
            return (
              <line
                key={`route-${i}`}
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={isHoveredRoute ? '#FF6B00' : '#252F3F'}
                strokeWidth={isHoveredRoute ? 4 : 2}
                strokeLinecap="round"
                className="transition-all duration-300"
                opacity={isAnyHovered && !isHoveredRoute ? 0.3 : 1}
              />
            );
          })}

          {/* Hubs */}
          {hubs.map((hub) => {
            const isHovered = hoveredHub === hub.id;
            const isAnyHovered = hoveredHub !== null;
            
            return (
              <g 
                key={hub.id}
                onMouseEnter={() => setHoveredHub(hub.id)}
                onMouseLeave={() => setHoveredHub(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: isAnyHovered && !isHovered ? 0.3 : 1 }}
              >
                <circle
                  cx={hub.x} cy={hub.y}
                  r={isHovered ? 12 : 8}
                  fill={hub.type === 'Primary Hub' ? '#FF6B00' : '#1F2937'}
                  stroke={isHovered ? '#fff' : '#FF6B00'}
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
                
                {/* Ping effect for hovered or primary hubs */}
                {(isHovered || hub.type === 'Primary Hub') && (
                  <circle cx={hub.x} cy={hub.y} r="8" fill="none" stroke="#FF6B00" strokeWidth="2">
                    <animate attributeName="r" values="8; 24; 8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8; 0; 0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                <text
                  x={hub.x}
                  y={hub.y - (isHovered ? 25 : 20)}
                  fill={isHovered ? '#fff' : '#94A3B8'}
                  fontSize={isHovered ? 16 : 14}
                  fontWeight="bold"
                  textAnchor="middle"
                  className="transition-all duration-300 pointer-events-none"
                >
                  {hub.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 bg-[#161B22]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Map Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF6B00] border border-[#FF6B00]"></span>
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider">Primary Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1F2937] border border-[#FF6B00]"></span>
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider">Regional/Transit Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#252F3F]"></span>
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider">Active Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
