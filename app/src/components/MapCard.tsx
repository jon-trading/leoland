import { RegionSnapshot } from '../game/types';

interface MapCardProps {
  regions: RegionSnapshot[];
  selectedRegionId: string;
  onSelectRegion: (regionId: string) => void;
}

const positions: Record<string, { x: number; y: number; w: number; h: number }> = {
  'north-crown': { x: 118, y: 40, w: 100, h: 84 },
  eastbridge: { x: 242, y: 108, w: 104, h: 92 },
  greenfold: { x: 82, y: 182, w: 126, h: 92 },
  southwatch: { x: 224, y: 228, w: 122, h: 82 },
  frostmere: { x: 58, y: 88, w: 84, h: 72 },
  riverglass: { x: 170, y: 142, w: 90, h: 76 },
};

export function MapCard({ regions, selectedRegionId, onSelectRegion }: MapCardProps) {
  return (
    <div className="map-card">
      <div className="map-card__header">
        <div>
          <p className="eyebrow">Country view</p>
          <h2>Leoland from above</h2>
        </div>
        <p className="muted">Tap a region to inspect its needs, mood, and identity.</p>
      </div>
      <svg viewBox="0 0 420 360" className="map-svg" role="img" aria-label="Illustrated overhead map of Leoland">
        <defs>
          <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#07364a" />
            <stop offset="100%" stopColor="#0d6a74" />
          </linearGradient>
          <linearGradient id="land" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d6d0a4" />
            <stop offset="100%" stopColor="#a8bc7f" />
          </linearGradient>
        </defs>
        <rect width="420" height="360" rx="28" fill="url(#ocean)" />
        <path d="M86 86c18-30 64-50 115-48 45 2 101 22 131 61 29 36 31 98 8 139-24 43-80 84-146 90-72 7-149-26-181-86-26-50-8-112 31-156 12-13 27-21 42-27Z" fill="url(#land)" stroke="#f0f3d2" strokeWidth="4"/>
        <path d="M235 68c15 18 22 42 13 72-11 34-26 48-27 82-1 21 14 43 34 61" fill="none" stroke="#82a7aa" strokeWidth="7" strokeLinecap="round" opacity="0.4"/>
        {regions.map((region) => {
          const pos = positions[region.id];
          const selected = selectedRegionId === region.id;
          const toneColor = region.pulseTone === 'hopeful' ? '#9af1c5' : region.pulseTone === 'strained' ? '#ffd363' : '#d6f2ff';
          return (
            <g key={region.id} onClick={() => onSelectRegion(region.id)} className="map-region" aria-hidden="true">
              <rect
                x={pos.x}
                y={pos.y}
                width={pos.w}
                height={pos.h}
                rx="22"
                fill={selected ? '#fff0c2' : 'rgba(255,255,255,0.18)'}
                stroke={selected ? '#ffd363' : 'rgba(255,255,255,0.34)'}
                strokeWidth={selected ? 4 : 2}
              />
              <circle cx={pos.x + pos.w - 14} cy={pos.y + 14} r="5.5" fill={toneColor} />
              <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 - 2} textAnchor="middle" className="map-region__label">{region.name}</text>
              <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 18} textAnchor="middle" className="map-region__sub">{region.currentPressure}</text>
              <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 31} textAnchor="middle" className="map-region__pulse">{region.pulseLabel}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
