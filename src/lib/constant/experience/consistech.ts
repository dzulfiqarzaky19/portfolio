import { Briefcase, CheckCircle, Database, FileText, Laptop, Users } from 'lucide-react';
import type { ExperienceData } from '@/lib/types/experience';

export const CONSISTECH: ExperienceData = {
    id: 'consistech',
    company: {
        name: 'Consistech Solution',
        logo: '/images/consistech-logo.webp',
        industry: 'IT Consultancy (ERP, HIS, Payroll)',
        mission: 'To provide tailored software solutions that improve operational efficiency and business workflows.',
        scale: 'Serving SMEs and enterprise clients with end-to-end digital solutions.',
        about: 'IT consultancy delivering ERP, hospital information systems, and payroll solutions.',
        website: 'https://consistechsolution.com/'
    },
    role: {
        title: 'Junior Full-Stack Engineer',
        type: 'Full-time',
        description: 'Delivered full-stack features across ERP, hospital, and payroll systems, working directly with stakeholders to gather requirements and conduct UAT.',
        image: '/images/consistech.webp',
        focus: [
            'Full-stack features (React, Vue, Node.js)',
            'Module ownership (Attendance, Payroll)',
            'Direct Client Interaction'
        ],
    },
    technicalContributions: [
        {
            title: 'Client Projects',
            description: 'Shipped client projects across ERP, hospital information systems, and payroll.',
            icon: Briefcase
        },
        {
            title: 'Module Ownership',
            description: 'Owned Attendance, Inventory, and Payroll modules end-to-end (auth/roles, CRUD, reporting).',
            icon: Database
        },
        {
            title: 'Full-Stack Delivery',
            description: 'Delivered full-stack features using React, Vue, and Node.js.',
            icon: Laptop
        },
        {
            title: 'Stakeholder Mgmt',
            description: 'Collaborated directly with stakeholders for requirements gathering and user acceptance testing.',
            icon: Users
        }
    ],
    businessImpact: [
        {
            title: 'Operational Efficiency',
            metric: 'Automation',
            description: 'Delivered critical modules that improved client operations (attendance tracking, payroll automation).',
            image: '/images/experience/consistech/erp.png'
        },
        {
            title: 'Client Success',
            metric: 'Successful Delivery',
            description: 'Strengthened communication and collaboration with stakeholders, ensuring successful project delivery.',
            image: '/images/experience/consistech/delivery.png'
        },
        {
            title: 'Skill Growth',
            metric: 'Full-Stack',
            description: 'Built foundational experience in full-stack development and client-facing engineering.',
            image: '/images/experience/consistech/stack.png'
        }
    ],
    keyTakeaways: [
        {
            title: 'End-to-End Specs',
            description: 'Learned to take a feature from requirement gathering to deployment.',
            icon: FileText
        },
        {
            title: 'Client Communication',
            description: 'Developed soft skills in translating technical concepts to business stakeholders.',
            icon: CheckCircle
        },
        {
            title: 'Versatility',
            description: 'Became comfortable switching between different tech stacks (React, Vue, Node).',
            icon: Laptop
        }
    ],
    theme: {
        primary: '#6B46C1', // Generic Purple for Tech
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #6B46C1 100%)' // Blue to Purple
    },
    cardImage: '/images/consistech.webp',
    codeLanguage: 'JavaScript',
    codeSnippet: `const express = require('express');
const router = express.Router();
const PayrollService = require('../services/PayrollService');

router.post('/calculate', async (req, res) => {
  try {
    const { employeeId, month, year } = req.body;
    
    const salary = await PayrollService.calculateNetSalary({
      employeeId, 
      period: { month, year }
    });

    const payslipUrl = await PayrollService.generatePayslipPdf(salary);

    res.json({
      success: true,
      data: {
        netSalary: salary.total,
        breakdown: salary.breakdown,
        payslip: payslipUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;`
};
