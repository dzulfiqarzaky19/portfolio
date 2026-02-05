import { BarChart3, Box, File, Map, ReceiptText, Smartphone, TrendingUp, Users } from 'lucide-react';
import type { ExperienceData } from '@/lib/types/experience';

export const EDOT: ExperienceData = {
    id: 'edot',
    company: {
        name: 'eDot (Nabati)',
        logo: '/images/edot-logo.png',
        industry: 'Digital solutions provider for FMCG',
        mission: 'To streamline partner and warehouse operations with scalable digital platforms.',
        scale: 'Supporting Nabati’s distribution network across Indonesia.',
        about: 'Focusing on logistics, partner management, and operational dashboards.',
        website: 'https://edot.id/id'
    },
    role: {
        title: 'Frontend Engineer',
        image: '/images/edot.webp',
        type: 'Contract',
        description: 'Built and optimized dashboards and mapping features for multi-role users, ensuring scalability and cost efficiency.',
        focus: [
            'Built operational dashboards',
            'Implemented Mapbox tracking',
            'Implemented multi-level approval workflow for file management',
            'Communicate with backend team to design API contracts'
        ],
    },
    technicalContributions: [
        {
            title: 'Multi-role Dashboard',
            description: 'Developed a multi-role dashboard for admins, partners, and staff with route and feature guards.',
            icon: Box
        },
        {
            title: 'Infinite Scroll & Filters',
            description: 'Implemented infinite scroll and filters for large datasets using Intersection Observer.',
            icon: BarChart3
        },
        {
            title: 'Multi-Level Approval Workflow',
            description: 'Implemented a multi-level approval workflow for file management, ensuring proper authorization and tracking.',
            icon: File
        },
        {
            title: 'Complex Ant Design Forms',
            description: 'Delivered complex Ant Design forms and aligned API contracts with backend teams.',
            icon: Smartphone
        }
    ],
    businessImpact: [
        {
            title: 'Cost Reduction',
            metric: 'Reduced API Costs',
            description: 'Reduced operational costs by migrating google maps to Mapbox.',
            image: '/images/experience/edot/mapbox.png'
        },
        {
            title: 'Usability & Scalability',
            metric: 'Multi-role Support',
            description: 'Improved usability and scalability of dashboards for diverse user roles.',
            image: '/images/experience/edot/dashboard.png'
        },
        {
            title: 'Shipment Tracking',
            metric: 'Enhanced Visibility',
            description: 'Enhanced shipment tracking and partner visibility across the platform.',
            image: '/images/experience/edot/tracking.png'
        }
    ],
    keyTakeaways: [
        {
            title: 'Map Integration',
            description: 'Deepened expertise in geospatial data visualization and map provider APIs.',
            icon: Map
        },
        {
            title: 'Performance',
            description: 'Mastered handling large datasets with virtualization and intersection observers.',
            icon: TrendingUp
        },
        {
            title: 'Role-Based Ops',
            description: 'Learned complexities of building secure, multi-tenant/multi-role operational systems.',
            icon: Users
        },
        {
            title: 'API Contract Design',
            description: 'Learned complexities of building secure, multi-tenant/multi-role operational API contracts.',
            icon: ReceiptText
        }
    ],
    theme: {
        primary: '#E01E26',
        gradient: 'linear-gradient(135deg, #F8B400 0%, #E01E26 100%)'
    },
    cardImage: '/images/edot.png',
    codeSnippet: `// Mapbox Integration with React
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const TrackingMap = ({ coordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 9
    });
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};`
};
