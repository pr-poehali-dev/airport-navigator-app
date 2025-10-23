import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type LocationType = 'exit' | 'restroom' | 'escalator' | 'shop' | 'info' | 'passport' | 'vip' | 'customs';

interface Location {
  id: string;
  name: string;
  type: LocationType;
  x: number;
  y: number;
  color: string;
}

const locations: Location[] = [
  { id: 'exit-a', name: 'Выход A1-A6', type: 'exit', x: 10, y: 85, color: '#7FFF00' },
  { id: 'exit-c', name: 'Выход C1-C10', type: 'exit', x: 10, y: 10, color: '#7FFF00' },
  { id: 'restroom-1', name: 'Туалет', type: 'restroom', x: 10, y: 22, color: '#10B981' },
  { id: 'exit-b', name: 'Выход B1-B6', type: 'exit', x: 10, y: 35, color: '#7FFF00' },
  { id: 'restroom-2', name: 'Туалет', type: 'restroom', x: 10, y: 45, color: '#10B981' },
  { id: 'restroom-3', name: 'Туалет', type: 'restroom', x: 35, y: 5, color: '#10B981' },
  { id: 'restroom-4', name: 'Туалет', type: 'restroom', x: 45, y: 5, color: '#10B981' },
  { id: 'restroom-5', name: 'Туалет', type: 'restroom', x: 55, y: 5, color: '#10B981' },
  { id: 'exit-d', name: 'Выход D1-D8', type: 'exit', x: 65, y: 5, color: '#7FFF00' },
  { id: 'restroom-6', name: 'Туалет', type: 'restroom', x: 75, y: 5, color: '#10B981' },
  { id: 'restroom-7', name: 'Туалет', type: 'restroom', x: 85, y: 5, color: '#10B981' },
  { id: 'exit-e', name: 'Выход E1-E10', type: 'exit', x: 90, y: 10, color: '#7FFF00' },
  { id: 'restroom-8', name: 'Туалет', type: 'restroom', x: 90, y: 22, color: '#10B981' },
  { id: 'restroom-9', name: 'Туалет', type: 'restroom', x: 90, y: 32, color: '#10B981' },
  { id: 'vip-lounge', name: 'VIP Зал', type: 'vip', x: 90, y: 70, color: '#7FFF00' },
  { id: 'exit-g', name: 'Выход G1-G5', type: 'exit', x: 90, y: 85, color: '#7FFF00' },
  { id: 'info-desk', name: 'Стойка информации', type: 'info', x: 50, y: 75, color: '#60A5FA' },
  { id: 'escalator-1', name: 'Эскалатор', type: 'escalator', x: 42, y: 75, color: '#F59E0B' },
  { id: 'escalator-2', name: 'Эскалатор', type: 'escalator', x: 58, y: 75, color: '#F59E0B' },
  { id: 'restroom-10', name: 'Туалет', type: 'restroom', x: 35, y: 65, color: '#10B981' },
  { id: 'restroom-11', name: 'Туалет', type: 'restroom', x: 45, y: 65, color: '#10B981' },
  { id: 'shop-1', name: 'Магазин', type: 'shop', x: 55, y: 65, color: '#A855F7' },
  { id: 'restroom-12', name: 'Туалет', type: 'restroom', x: 65, y: 65, color: '#10B981' },
  { id: 'passport-1', name: 'Паспортный контроль', type: 'passport', x: 30, y: 55, color: '#8B4513' },
  { id: 'passport-2', name: 'Паспортный контроль', type: 'passport', x: 45, y: 55, color: '#8B4513' },
  { id: 'passport-3', name: 'Паспортный контроль', type: 'passport', x: 60, y: 55, color: '#8B4513' },
  { id: 'customs-1', name: 'Таможенный контроль', type: 'customs', x: 50, y: 40, color: '#9CA3AF' },
  { id: 'restroom-13', name: 'Туалет', type: 'restroom', x: 35, y: 30, color: '#10B981' },
  { id: 'passport-4', name: 'Паспортный контроль', type: 'passport', x: 42, y: 30, color: '#8B4513' },
  { id: 'restroom-14', name: 'Туалет', type: 'restroom', x: 50, y: 30, color: '#10B981' },
  { id: 'passport-5', name: 'Паспортный контроль', type: 'passport', x: 58, y: 30, color: '#8B4513' },
  { id: 'restroom-15', name: 'Туалет', type: 'restroom', x: 65, y: 30, color: '#10B981' },
];

const getLocationIcon = (type: LocationType): { emoji: string; shape: string } => {
  const icons: Record<LocationType, { emoji: string; shape: string }> = {
    exit: { emoji: '🚪', shape: 'rectangle' },
    restroom: { emoji: '🚻', shape: 'circle' },
    escalator: { emoji: '🔼', shape: 'circle' },
    shop: { emoji: '🛒', shape: 'circle' },
    info: { emoji: '❓', shape: 'square' },
    passport: { emoji: '💼', shape: 'square' },
    vip: { emoji: '⭐', shape: 'rectangle' },
    customs: { emoji: '🛃', shape: 'rectangle' },
  };
  return icons[type];
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentPosition] = useState({ x: 50, y: 50, name: 'Вы здесь' });

  const filteredLocations = searchQuery
    ? locations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery('');
  };

  const calculateRoute = () => {
    if (!selectedLocation) return null;
    
    const dx = selectedLocation.x - currentPosition.x;
    const dy = selectedLocation.y - currentPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const timeMinutes = Math.round((distance / 10) * 2);
    const distanceMeters = Math.round(distance * 10);

    return {
      time: timeMinutes,
      distance: distanceMeters,
      steps: [
        'Идите прямо к эскалатору',
        `Поверните ${dx > 0 ? 'направо' : 'налево'} через 30 метров`,
        `Продолжайте движение ${dy < 0 ? 'вперед' : 'назад'}`,
        `${selectedLocation.name} будет слева`,
      ],
    };
  };

  const route = calculateRoute();

  const calculateWaypoints = (): Location[] => {
    if (!selectedLocation) return [];
    
    const waypoints: Location[] = [];
    const dx = selectedLocation.x - currentPosition.x;
    const dy = selectedLocation.y - currentPosition.y;
    
    locations.forEach(loc => {
      const distToCurrent = Math.sqrt(Math.pow(loc.x - currentPosition.x, 2) + Math.pow(loc.y - currentPosition.y, 2));
      const distToTarget = Math.sqrt(Math.pow(loc.x - selectedLocation.x, 2) + Math.pow(loc.y - selectedLocation.y, 2));
      const totalDist = Math.sqrt(dx * dx + dy * dy);
      
      const isOnPath = distToCurrent + distToTarget < totalDist + 20 && 
                       loc.id !== selectedLocation.id &&
                       distToCurrent > 5;
      
      if (isOnPath) {
        waypoints.push({ ...loc, distance: distToCurrent } as Location & { distance: number });
      }
    });
    
    return waypoints.sort((a, b) => (a as any).distance - (b as any).distance).slice(0, 4);
  };

  const waypoints = selectedLocation ? calculateWaypoints() : [];

  const Legend = () => (
    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur p-2 rounded-xl shadow-lg z-10 text-[10px]">
      <h3 className="font-bold mb-2 text-[#2563EB] text-xs">Легенда</h3>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {[
          { type: 'exit' as LocationType, label: 'Выходы', color: '#7FFF00' },
          { type: 'restroom' as LocationType, label: 'Туалеты', color: '#10B981' },
          { type: 'escalator' as LocationType, label: 'Эскалаторы', color: '#F59E0B' },
          { type: 'shop' as LocationType, label: 'Магазины', color: '#A855F7' },
          { type: 'info' as LocationType, label: 'Информация', color: '#60A5FA' },
          { type: 'passport' as LocationType, label: 'Контроль', color: '#8B4513' },
          { type: 'vip' as LocationType, label: 'VIP', color: '#7FFF00' },
        ].map((item) => {
          const icon = getLocationIcon(item.type);
          return (
            <div key={item.type} className="flex items-center gap-1">
              <div
                className={`w-4 h-4 flex items-center justify-center text-[8px] ${
                  icon.shape === 'circle' ? 'rounded-full' : icon.shape === 'square' ? 'rounded' : 'rounded-sm'
                }`}
                style={{ backgroundColor: item.color }}
              >
                {icon.emoji}
              </div>
              <span className="text-gray-700 text-[9px]">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-[SF_Pro_Display,system-ui,sans-serif]">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <header className="p-4 bg-white/80 backdrop-blur">
          <h1 className="text-2xl font-bold text-[#2563EB]">Навигатор</h1>
        </header>

        <div className="px-4 py-3 bg-white/80 backdrop-blur relative z-20">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите гейт или локацию"
              className="pl-10 rounded-full border-2 border-gray-200 focus:border-[#2563EB] h-12"
            />
          </div>
          
          {searchQuery && filteredLocations.length > 0 && (
            <Card className="absolute top-full mt-2 w-[calc(100%-2rem)] bg-white shadow-xl rounded-2xl overflow-hidden z-30">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleLocationSelect(loc)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors border-b last:border-b-0"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center text-lg ${
                      getLocationIcon(loc.type).shape === 'circle' ? 'rounded-full' : 'rounded-lg'
                    }`}
                    style={{ backgroundColor: loc.color }}
                  >
                    {getLocationIcon(loc.type).emoji}
                  </div>
                  <span className="font-medium text-gray-800">{loc.name}</span>
                </button>
              ))}
            </Card>
          )}
        </div>

        <div className="flex-1 relative overflow-hidden bg-gray-100">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="100" height="100" fill="#F3F4F6" />
            
            <rect x="48" y="35" width="4" height="15" fill="#D1D5DB" opacity="0.6" />
            <rect x="46" y="35" width="8" height="2" fill="#9CA3AF" />
            <text x="50" y="45" fontSize="2" textAnchor="middle" fill="#6B7280">Таможня</text>

            {selectedLocation && (
              <g className="animate-fade-in">
                <line
                  x1={currentPosition.x}
                  y1={currentPosition.y}
                  x2={waypoints[0]?.x || selectedLocation.x}
                  y2={waypoints[0]?.y || selectedLocation.y}
                  stroke="#2563EB"
                  strokeWidth="1"
                  strokeDasharray="2,1"
                />
                {waypoints.map((wp, idx) => {
                  const nextWp = waypoints[idx + 1] || selectedLocation;
                  return (
                    <line
                      key={wp.id}
                      x1={wp.x}
                      y1={wp.y}
                      x2={nextWp.x}
                      y2={nextWp.y}
                      stroke="#2563EB"
                      strokeWidth="1"
                      strokeDasharray="2,1"
                    />
                  );
                })}
                <circle cx={currentPosition.x} cy={currentPosition.y} r="1" fill="#2563EB" />
                <circle cx={selectedLocation.x} cy={selectedLocation.y} r="1.5" fill="#2563EB" className="animate-pulse" />
                {waypoints.map(wp => (
                  <circle key={wp.id} cx={wp.x} cy={wp.y} r="1.2" fill="#2563EB" opacity="0.6" />
                ))}
              </g>
            )}

            {locations.map((loc) => {
              const icon = getLocationIcon(loc.type);
              const isHighlighted = selectedLocation?.id === loc.id;
              const size = loc.type === 'exit' || loc.type === 'vip' ? 6 : 4;
              
              return (
                <g key={loc.id} className={isHighlighted ? 'animate-pulse' : ''}>
                  {icon.shape === 'circle' && (
                    <circle cx={loc.x} cy={loc.y} r={size / 2} fill={loc.color} opacity={isHighlighted ? 1 : 0.85} />
                  )}
                  {icon.shape === 'square' && (
                    <rect x={loc.x - size / 2} y={loc.y - size / 2} width={size} height={size} rx="1" fill={loc.color} opacity={isHighlighted ? 1 : 0.85} />
                  )}
                  {icon.shape === 'rectangle' && (
                    <rect x={loc.x - size / 1.5} y={loc.y - size / 2} width={size * 1.3} height={size} rx="1" fill={loc.color} opacity={isHighlighted ? 1 : 0.85} />
                  )}
                  <text x={loc.x} y={loc.y + 1} fontSize="2.5" textAnchor="middle" dominantBaseline="middle">
                    {icon.emoji}
                  </text>
                </g>
              );
            })}

            <circle cx={currentPosition.x} cy={currentPosition.y} r="2.5" fill="#2563EB" />
            <circle cx={currentPosition.x} cy={currentPosition.y} r="1.5" fill="white" />
            <text x={currentPosition.x} y={currentPosition.y + 6} fontSize="2.5" textAnchor="middle" fill="#2563EB" fontWeight="bold">
              📍
            </text>
          </svg>

          <Legend />
        </div>

        {selectedLocation && route && (
          <Card className="bg-white rounded-t-3xl shadow-2xl p-6 animate-slide-in-right max-h-[45vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedLocation.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedLocation(null)}
                className="rounded-full"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 mb-4">
              <div className="flex gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-[#2563EB]" />
                  <div>
                    <div className="text-2xl font-bold text-[#2563EB]">~{route.time}</div>
                    <div className="text-xs text-gray-600">минут</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Navigation" size={20} className="text-[#2563EB]" />
                  <div>
                    <div className="text-2xl font-bold text-[#2563EB]">{route.distance}</div>
                    <div className="text-xs text-gray-600">метров</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">Маршрут:</h3>
              {route.steps.map((step, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <nav className="bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-[#2563EB]">
            <Icon name="Home" size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Icon name="Search" size={24} />
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Icon name="Route" size={24} />
            <span className="text-xs">Route</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Icon name="User" size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}