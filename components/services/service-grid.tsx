'use client';

import { useEffect, useState } from 'react';
import { Servicio } from '@/lib/types';
import { getServicios } from '@/lib/api-client';
import { Loader } from 'lucide-react';
import Image from 'next/image';

export function ServiceGrid() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const data = await getServicios();
        setServicios(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error('[v0] Error fetching servicios:', err);
        setError('Error al cargar servicios');
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicios.map((servicio) => (
        <div
          key={servicio.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          {servicio.imagen && (
            <div className="relative h-48 w-full bg-gray-200">
              <Image
                src={servicio.imagen}
                alt={servicio.nombre}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-service.jpg';
                }}
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {servicio.nombre}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {servicio.descripcion}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-cyan-600">
                ${servicio.precio}
              </span>
              {servicio.activo && (
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Disponible
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
