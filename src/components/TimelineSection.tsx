import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { members as allMembers } from '../lib/members';

// ─── Chapter data ───
export interface ChapterData {
  year: string;
  title: string;
  content: string;
  chips?: string[];
  extraLabel?: { text: string; color: 'orange' | 'blue' };
  flagship?: boolean;
  memberIds?: string[];
}

export const chapters: ChapterData[] = [
  {
    year: '2021',
    title: '{i}spin Is Initiated',
    content: 'Faculty at NSCET establish {i}spin — a student technical organization built on a radical premise: give students real infrastructure to own, build, and maintain. The founding team is assembled.',
  },
  {
    year: '2021',
    title: 'NSCET Website — Launched',
    memberIds: ['thanush','rishikesh','logesh'],
    chips: ['DEPLOYED', 'Web Development', 'React'],
    extraLabel: { text: '// Still live and maintained today', color: 'blue' },
    content: "{i}spin's first mission: design and deploy the official NSCET college website. Built from the ground up by student engineers with faculty guidance — and shipped to production within the founding year.",
  },
  {
    year: '2022',
    title: 'The Second Wave — New Members Join',
    content: "{i}spin opens its first structured recruitment cycle. New student engineers are onboarded, expanding the organization's capacity and bringing fresh technical perspectives to ongoing operations.",
  },
  {
    year: '2022',
    title: 'Library Management System — Deployed',
    memberIds: ['rishikesh','ahamed','pandeeswaran'],
    chips: ['DEPLOYED', 'Full Stack', 'Database'],
    content: "{i}spin engineers design and deploy a department library management system — digitizing book inventories, borrow records, and catalog operations across NSCET's departments.",
  },
  {
    year: '2023',
    title: 'Skill-Based Selection Introduced',
    extraLabel: { text: '// Merit-based. Mission-driven.', color: 'orange' },
    content: "{i}spin formalizes its recruitment process. For the first time, new members are selected through technical assessments — ensuring every engineer who joins is equipped to contribute to live production systems.",
  },
  {
    year: '2023',
    title: 'Transport Management System — Deployed',
    memberIds: ['logesh','sakthi'],
    chips: ['DEPLOYED', 'IoT', 'Real-time', 'Mobile'],
    content: "Real-time GPS tracking and scheduling for NSCET's bus fleet. Student engineers build a live transport system connecting campus mobility with data pipelines — used by students and staff daily.",
  },
  {
    year: '2024',
    title: 'Hackathon Website — Built & Launched',
    memberIds: ['thanush','pandeeswaran'],
    chips: ['DEPLOYED', 'Event Tech', 'Auth', 'Web Dev'],
    content: "NSCET conducts its first organized hackathon. {i}spin engineers design and ship the registration portal, team management system, and result publishing platform — end-to-end, in-house, in time.",
  },
  {
    year: '2025',
    title: 'Third Generation — Selection with IQarena',
    content: "{i}spin's most rigorous intake yet. New members are selected using a structured technical assessment conducted on the organization's own evaluation infrastructure — engineers assessed by the tools they'll build.",
  },
  {
    year: '2025',
    title: 'IQarena — Assessment Portal Deployed',
    memberIds: ['ahamed','sakthi','rishikesh'],
    chips: ['DEPLOYED', 'EdTech', 'Assessment', 'Portal'],
    content: "{i}spin builds and launches IQarena — a secure, scalable online examination and assessment platform enabling faculty to create, assign, and evaluate tests across all NSCET departments.",
  },
  {
    year: '2026',
    title: 'IQarena 2.0 — JEE & NEET Preparation',
    memberIds: ['ahamed','logesh','pandeeswaran'],
    chips: ['LIVE', 'EdTech', 'JEE/NEET', 'Scale'],
    extraLabel: { text: "// {i}spin's first public-facing educational platform", color: 'blue' },
    content: "IQarena evolves. Version 2.0 extends the platform beyond internal assessments — launching a dedicated preparation module for JEE and NEET, serving students at scale for national-level competitive examinations.",
  },
  {
    year: '2026',
    title: "Campus Nexus — {i}spin's Most Ambitious Build",
    memberIds: allMembers.map(m => m.id),
    chips: ['LIVE', 'ERP', 'Enterprise', 'Full Stack'],
    flagship: true,
    content: "Five years of accumulated engineering knowledge culminates in Campus Nexus — a full-scale college ERP system managing academic records, administrative workflows, staff operations, and student data for the entire institution.",
  },
];

// ─── Animation Components (simplified elite SVGs) ───

const NetworkGenesis = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" />
    <defs>
      <pattern id="ng-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="none" stroke="rgba(255,94,26,0.05)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="320" height="240" fill="url(#ng-grid)" />
    <circle cx="160" cy="120" r="14" fill="#FF5E1A" opacity={playing ? 1 : 0.3}>
      {playing && <animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite" />}
    </circle>
    <circle cx="160" cy="120" r="14" fill="none" stroke="#FF5E1A" strokeWidth="1" opacity="0.3">
      {playing && <animate attributeName="r" values="14;35" dur="1.5s" repeatCount="indefinite" />}
      {playing && <animate attributeName="opacity" values="0.4;0" dur="1.5s" repeatCount="indefinite" />}
    </circle>
    {[
      { cx: 80, cy: 60 }, { cx: 240, cy: 60 },
      { cx: 80, cy: 180 }, { cx: 240, cy: 180 },
    ].map((n, i) => (
      <g key={i}>
        <line x1={160} y1={120} x2={n.cx} y2={n.cy} stroke="#FF5E1A" strokeWidth="1" opacity="0.3"
          strokeDasharray="4 4">
          {playing && <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />}
        </line>
        <circle cx={n.cx} cy={n.cy} r="9" fill="rgba(255,94,26,0.5)">
          {playing && <animate attributeName="r" values="9;10;9" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
        </circle>
        {playing && (
          <circle r="3" fill="#FF5E1A">
            <animateMotion dur="1.5s" begin={`${i * 0.4}s`} repeatCount="indefinite"
              path={`M${n.cx},${n.cy} L160,120`} />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        )}
      </g>
    ))}
  </svg>
));
NetworkGenesis.displayName = 'NetworkGenesis';

const BrowserBuild = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" rx="8" />
    <rect x="10" y="10" width="300" height="220" rx="6" fill="#111318" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <circle cx="26" cy="24" r="4" fill="#FF5E5E" />
    <circle cx="38" cy="24" r="4" fill="#FFD93D" />
    <circle cx="50" cy="24" r="4" fill="#6BCB77" />
    <line x1="10" y1="34" x2="310" y2="34" stroke="rgba(255,255,255,0.1)" />
    <rect x="20" y="44" width="0" height="40" fill="rgba(255,94,26,0.15)" rx="2">
      {playing && <animate attributeName="width" from="0" to="280" dur="1s" fill="freeze" />}
    </rect>
    {[0,1,2,3].map(i => (
      <rect key={i} x={20 + i * 70} y="48" width="0" height="6" rx="2" fill="rgba(255,94,26,0.4)">
        {playing && <animate attributeName="width" from="0" to="50" dur="0.3s" begin={`${1 + i * 0.2}s`} fill="freeze" />}
      </rect>
    ))}
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={20 + (i % 2) * 145} y={95 + Math.floor(i / 2) * 40} width="130" height="30" rx="3"
        fill="rgba(255,255,255,0.04)" opacity="0">
        {playing && <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${2 + i * 0.2}s`} fill="freeze" />}
      </rect>
    ))}
    <rect x="260" y="38" width="40" height="14" rx="7" fill="#6BCB77" opacity="0">
      {playing && <animate attributeName="opacity" values="0;0;1;1;0.6;1" dur="4s" begin="3.5s" fill="freeze" />}
    </rect>
    <text x="272" y="48" fontSize="7" fill="#0A0A0A" fontFamily="DM Mono" opacity="0">
      LIVE
      {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3.5s" fill="freeze" />}
    </text>
  </svg>
));
BrowserBuild.displayName = 'BrowserBuild';

const TeamAssembly = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" />
    {[
      { cx: 140, cy: 100 }, { cx: 180, cy: 100 }, { cx: 160, cy: 140 },
    ].map((n, i) => (
      <g key={i}>
        <polygon points={`${n.cx},${n.cy - 12} ${n.cx + 10},${n.cy - 6} ${n.cx + 10},${n.cy + 6} ${n.cx},${n.cy + 12} ${n.cx - 10},${n.cy + 6} ${n.cx - 10},${n.cy - 6}`}
          fill="rgba(255,94,26,0.3)" stroke="#FF5E1A" strokeWidth="1" />
      </g>
    ))}
    <line x1="140" y1="100" x2="180" y2="100" stroke="#FF5E1A" strokeWidth="1" opacity="0.3" />
    <line x1="140" y1="100" x2="160" y2="140" stroke="#FF5E1A" strokeWidth="1" opacity="0.3" />
    <line x1="180" y1="100" x2="160" y2="140" stroke="#FF5E1A" strokeWidth="1" opacity="0.3" />
    {[
      { cx: 100, cy: 80, fromX: 20, fromY: 30 },
      { cx: 220, cy: 140, fromX: 300, fromY: 210 },
    ].map((n, i) => (
      <g key={`new-${i}`}>
        <polygon points={`${n.cx},${n.cy - 12} ${n.cx + 10},${n.cy - 6} ${n.cx + 10},${n.cy + 6} ${n.cx},${n.cy + 12} ${n.cx - 10},${n.cy + 6} ${n.cx - 10},${n.cy - 6}`}
          fill="rgba(0,123,255,0.3)" stroke="#007BFF" strokeWidth="1" opacity={playing ? 1 : 0}>
          {playing && <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin={`${1 + i * 0.8}s`} fill="freeze" />}
        </polygon>
        <line x1={160} y1={120} x2={n.cx} y2={n.cy} stroke="#007BFF" strokeWidth="1" opacity="0"
          strokeDasharray="4 4">
          {playing && <animate attributeName="opacity" from="0" to="0.4" dur="0.3s" begin={`${1.5 + i * 0.8}s`} fill="freeze" />}
          {playing && <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />}
        </line>
      </g>
    ))}
    <text x="250" y="30" fontSize="10" fill="#8A8F9E" fontFamily="DM Mono">
      TEAM: {playing ? '5' : '3'}
    </text>
  </svg>
));
TeamAssembly.displayName = 'TeamAssembly';

const DatabasePopulation = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" rx="6" />
    <rect x="10" y="10" width="300" height="24" fill="rgba(255,94,26,0.08)" rx="3" />
    {['BOOK_ID', 'TITLE', 'STATUS', 'DATE'].map((h, i) => (
      <text key={h} x={25 + i * 75} y="26" fontSize="7" fill="#FF5E1A" fontFamily="DM Mono" opacity={playing ? 1 : 0.3}>
        {h}
        {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={`${i * 0.1}s`} fill="freeze" />}
      </text>
    ))}
    {[0, 1, 2, 3, 4].map(i => (
      <g key={i}>
        <rect x="10" y={42 + i * 28} width="300" height="22" fill="rgba(255,255,255,0.02)" rx="2" opacity="0">
          {playing && <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${0.5 + i * 0.4}s`} fill="freeze" />}
        </rect>
        <rect x="10" y={42 + i * 28} width="300" height="22" fill="rgba(255,94,26,0.1)" rx="2" opacity="0">
          {playing && <animate attributeName="opacity" values="0;0.3;0" dur="0.6s" begin={`${0.5 + i * 0.4}s`} fill="freeze" />}
        </rect>
        <text x="25" y={56 + i * 28} fontSize="7" fill="#8A8F9E" fontFamily="DM Mono" opacity="0">
          {`BK-${100 + i}   Algorithms V${i + 1}   ✓   2024-0${i + 1}`}
          {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={`${0.7 + i * 0.4}s`} fill="freeze" />}
        </text>
      </g>
    ))}
    <text x="220" y="230" fontSize="8" fill="#00FF88" fontFamily="DM Mono" opacity="0">
      5 records loaded
      {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3s" fill="freeze" />}
    </text>
  </svg>
));
DatabasePopulation.displayName = 'DatabasePopulation';

const SkillFilter = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" />
    <line x1="160" y1="20" x2="160" y2="220" stroke="#FF5E1A" strokeWidth="2" opacity="0.6" />
    <text x="145" y="15" fontSize="6" fill="#FF5E1A" fontFamily="DM Mono">SKILL GATE</text>
    {playing && (
      <rect x="155" y="20" width="10" height="4" fill="#FF5E1A" opacity="0.6">
        <animate attributeName="y" values="20;220;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
      </rect>
    )}
    {[0, 1, 2, 3, 4].map(i => {
      const pass = i < 3;
      const y = 50 + i * 35;
      return (
        <g key={i}>
          <circle cx={playing ? (pass ? 240 : 80) : 80} cy={y} r="8"
            fill={pass ? 'rgba(0,255,136,0.3)' : 'rgba(255,94,26,0.2)'}
            stroke={pass ? '#00FF88' : '#FF5E1A'} strokeWidth="1">
            {playing && (
              <animate attributeName="cx" from="80" to={pass ? '240' : '80'} dur="0.8s"
                begin={`${1 + i * 0.6}s`} fill="freeze" />
            )}
          </circle>
        </g>
      );
    })}
    <text x="230" y="230" fontSize="9" fill="#00FF88" fontFamily="DM Mono">
      ACCEPTED: {playing ? '3' : '0'}
    </text>
  </svg>
));
SkillFilter.displayName = 'SkillFilter';

const GPSTracking = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" />
    <path d="M40,200 Q80,180 120,160 Q160,140 200,100 Q240,60 280,40"
      fill="none" stroke="#FF5E1A" strokeWidth="2" opacity="0.4"
      strokeDasharray="8 4">
      {playing && <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite" />}
    </path>
    {[
      { cx: 40, cy: 200 }, { cx: 120, cy: 160 }, { cx: 200, cy: 100 }, { cx: 280, cy: 40 },
    ].map((s, i) => (
      <g key={i}>
        <circle cx={s.cx} cy={s.cy} r="5" fill="#FF5E1A" opacity="0.6" />
        {playing && (
          <circle cx={s.cx} cy={s.cy} r="5" fill="none" stroke="#FF5E1A" opacity="0.3">
            <animate attributeName="r" values="5;15" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        )}
      </g>
    ))}
    {playing && (
      <rect width="12" height="8" rx="2" fill="#FF5E1A">
        <animateMotion dur="4s" repeatCount="indefinite"
          path="M40,200 Q80,180 120,160 Q160,140 200,100 Q240,60 280,40" />
      </rect>
    )}
    <circle cx="20" cy="20" r="4" fill="#FF3B3B">
      {playing && <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />}
    </circle>
    <text x="30" y="24" fontSize="8" fill="#FF3B3B" fontFamily="DM Mono">LIVE</text>
    <text x="20" y="230" fontSize="7" fill="#8A8F9E" fontFamily="DM Mono">SPD: 42km/h · ETA: 8min</text>
  </svg>
));
GPSTracking.displayName = 'GPSTracking';

const RegistrationDashboard = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" rx="6" />
    <text x="20" y="25" fontSize="9" fill="#FF5E1A" fontFamily="DM Mono">HACKATHON · REGISTRATION</text>
    {Array.from({ length: 12 }).map((_, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      return (
        <rect key={i} x={20 + col * 72} y={40 + row * 55} width="64" height="45" rx="4"
          fill={i < 10 ? 'rgba(255,94,26,0.1)' : 'rgba(255,94,26,0.03)'}
          stroke={i < 10 ? 'rgba(255,94,26,0.3)' : 'rgba(255,94,26,0.1)'}
          strokeWidth="1" opacity="0">
          {playing && (
            <animate attributeName="opacity" from="0" to="1" dur="0.3s"
              begin={`${0.3 + i * 0.2}s`} fill="freeze" />
          )}
        </rect>
      );
    })}
    <text x="20" y="225" fontSize="8" fill="#00FF88" fontFamily="DM Mono" opacity="0">
      142 PARTICIPANTS REGISTERED
      {playing && <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3s" fill="freeze" />}
    </text>
  </svg>
));
RegistrationDashboard.displayName = 'RegistrationDashboard';

const AssessmentFeed = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" rx="6" />
    <text x="15" y="20" fontSize="8" fill="#FF5E1A" fontFamily="DM Mono">IQarena · LIVE ASSESSMENT</text>
    <circle cx="300" cy="16" r="3" fill="#FF5E1A">
      {playing && <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />}
    </circle>
    {[0, 1, 2, 3, 4, 5, 6].map(i => {
      const scores = [87, 92, 64, 78, 95, 71, 88];
      const pass = scores[i] >= 75;
      return (
        <g key={i} opacity="0">
          {playing && <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${0.5 + i * 0.5}s`} fill="freeze" />}
          <text x="15" y={44 + i * 26} fontSize="7" fill="#8A8F9E" fontFamily="DM Mono">
            {`C-${1000 + i}`}
          </text>
          <rect x="60" y={38 + i * 26} width="140" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
          <rect x="60" y={38 + i * 26} width="0" height="6" rx="3" fill={pass ? '#FF5E1A' : 'rgba(255,94,26,0.3)'}>
            {playing && <animate attributeName="width" from="0" to={scores[i] * 1.4} dur="0.5s" begin={`${0.6 + i * 0.5}s`} fill="freeze" />}
          </rect>
          <text x="210" y={44 + i * 26} fontSize="7" fill={pass ? '#00FF88' : '#FF5E1A'} fontFamily="DM Mono">
            {scores[i]}% {pass ? '✓' : '✗'}
          </text>
        </g>
      );
    })}
  </svg>
));
AssessmentFeed.displayName = 'AssessmentFeed';

const ExamInterface = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" rx="8" />
    <rect x="8" y="8" width="304" height="224" rx="6" fill="#111318" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <circle cx="22" cy="20" r="3" fill="#FF5E5E" />
    <circle cx="32" cy="20" r="3" fill="#FFD93D" />
    <circle cx="42" cy="20" r="3" fill="#6BCB77" />
    <line x1="8" y1="30" x2="312" y2="30" stroke="rgba(255,255,255,0.06)" />
    <text x="20" y="50" fontSize="7" fill="#8A8F9E" fontFamily="DM Mono">Q.12 / 30</text>
    <rect x="250" y="38" width="50" height="14" rx="3" fill="rgba(255,94,26,0.1)" stroke="#FF5E1A" strokeWidth="0.5" />
    <text x="260" y="48" fontSize="7" fill="#FF5E1A" fontFamily="DM Mono">14:32</text>
    <text x="20" y="75" fontSize="8" fill="#F0F0F0" fontFamily="DM Mono" opacity="0">
      What is the time complexity of binary search?
      {playing && <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.5s" fill="freeze" />}
    </text>
    {['A) O(n)', 'B) O(log n)', 'C) O(n²)', 'D) O(1)'].map((opt, i) => (
      <g key={i} opacity="0">
        {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={`${1.5 + i * 0.3}s`} fill="freeze" />}
        <rect x="20" y={95 + i * 28} width="270" height="22" rx="4"
          fill={i === 1 ? 'rgba(255,94,26,0.15)' : 'rgba(255,255,255,0.03)'}
          stroke={i === 1 ? '#FF5E1A' : 'rgba(255,255,255,0.06)'} strokeWidth="1">
          {i === 1 && playing && <animate attributeName="fill" from="rgba(255,255,255,0.03)" to="rgba(255,94,26,0.15)" dur="0.3s" begin="3s" fill="freeze" />}
        </rect>
        <text x="35" y={109 + i * 28} fontSize="7" fill="#F0F0F0" fontFamily="DM Mono">{opt}</text>
      </g>
    ))}
    <rect x="20" y="215" width="270" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
    <rect x="20" y="215" width="108" height="4" rx="2" fill="#FF5E1A" opacity="0.6" />
  </svg>
));
ExamInterface.displayName = 'ExamInterface';

const ScaleGrowth = React.memo(({ playing }: { playing: boolean }) => (
  <svg viewBox="0 0 320 240" className="w-full h-full">
    <rect width="320" height="240" fill="#0D0D0D" />
    {[0, 1, 2, 3, 4].map(i => (
      <line key={i} x1="40" y1={40 + i * 40} x2="300" y2={40 + i * 40} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
    ))}
    {[
      { x: 60, h: 40, label: '50' },
      { x: 110, h: 80, label: '200' },
      { x: 160, h: 120, label: '800' },
      { x: 210, h: 150, label: '2.1K' },
      { x: 260, h: 180, label: '4.2K' },
    ].map((bar, i) => (
      <g key={i}>
        <rect x={bar.x} y={200} width="30" height="0" rx="3" fill="#FF5E1A" opacity="0.7">
          {playing && (
            <animate attributeName="height" from="0" to={bar.h} dur="0.6s" begin={`${0.5 + i * 0.3}s`} fill="freeze" />
          )}
          {playing && (
            <animate attributeName="y" from="200" to={200 - bar.h} dur="0.6s" begin={`${0.5 + i * 0.3}s`} fill="freeze" />
          )}
        </rect>
        <text x={bar.x + 5} y={195 - bar.h} fontSize="7" fill="#FF5E1A" fontFamily="DM Mono" opacity="0">
          {bar.label}
          {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={`${1 + i * 0.3}s`} fill="freeze" />}
        </text>
      </g>
    ))}
    <polyline points="75,160 125,120 175,80 225,50 275,20" fill="none" stroke="#00FF88" strokeWidth="1.5"
      strokeDasharray="200" strokeDashoffset={playing ? '0' : '200'} opacity="0.6">
      {playing && <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" begin="2.5s" fill="freeze" />}
    </polyline>
    <text x="200" y="15" fontSize="8" fill="#00FF88" fontFamily="DM Mono" opacity="0">
      SCALE ACHIEVED
      {playing && <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="4s" fill="freeze" />}
    </text>
  </svg>
));
ScaleGrowth.displayName = 'ScaleGrowth';

const ERPArchitecture = React.memo(({ playing }: { playing: boolean }) => {
  const modules = [
    { label: 'ACADEMICS', cx: 160, cy: 40 },
    { label: 'ADMIN', cx: 270, cy: 80 },
    { label: 'FINANCE', cx: 270, cy: 160 },
    { label: 'STUDENT', cx: 160, cy: 200 },
    { label: 'STAFF', cx: 50, cy: 160 },
    { label: 'LIBRARY', cx: 50, cy: 80 },
  ];

  return (
    <svg viewBox="0 0 320 240" className="w-full h-full">
      <rect width="320" height="240" fill="#0D0D0D" />
      <rect x="130" y="105" width="60" height="30" rx="6" fill="#FF5E1A" opacity="0.9">
        {playing && <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />}
      </rect>
      <text x="140" y="124" fontSize="8" fill="#0A0A0A" fontFamily="Syne" fontWeight="700">NEXUS</text>
      <rect x="125" y="100" width="70" height="40" rx="8" fill="none" stroke="#FF5E1A" strokeWidth="1" opacity="0.2">
        {playing && <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />}
      </rect>
      {modules.map((m, i) => (
        <g key={m.label}>
          <line x1="160" y1="120" x2={m.cx} y2={m.cy} stroke="#FF5E1A" strokeWidth="1" opacity="0"
            strokeDasharray="4 4">
            {playing && <animate attributeName="opacity" from="0" to="0.3" dur="0.5s" begin={`${1 + i * 0.3}s`} fill="freeze" />}
            {playing && <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />}
          </line>
          <circle cx={m.cx} cy={m.cy} r="16" fill="rgba(255,94,26,0.1)" stroke="#FF5E1A" strokeWidth="1" opacity="0">
            {playing && <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${1 + i * 0.3}s`} fill="freeze" />}
          </circle>
          <text x={m.cx} y={m.cy + 3} textAnchor="middle" fontSize="5" fill="#F0F0F0" fontFamily="DM Mono" opacity="0">
            {m.label}
            {playing && <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin={`${1.2 + i * 0.3}s`} fill="freeze" />}
          </text>
          {playing && (
            <circle r="3" fill="#FF5E1A" opacity="0">
              <animateMotion dur={`${1.5 + i * 0.2}s`} begin={`${2 + i * 0.3}s`} repeatCount="indefinite"
                path={`M${m.cx},${m.cy} L160,120`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${1.5 + i * 0.2}s`} begin={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
      <text x="100" y="235" fontSize="7" fill="#00FF88" fontFamily="DM Mono" opacity="0">
        ALL SYSTEMS CONNECTED
        {playing && <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="4s" fill="freeze" />}
      </text>
    </svg>
  );
});
ERPArchitecture.displayName = 'ERPArchitecture';

// ─── Animation mapping ───
const animationComponents: Record<number, React.FC<{ playing: boolean }>> = {
  0: NetworkGenesis,
  1: BrowserBuild,
  2: TeamAssembly,
  3: DatabasePopulation,
  4: SkillFilter,
  5: GPSTracking,
  6: RegistrationDashboard,
  7: AssessmentFeed,
  8: ExamInterface,
  9: ScaleGrowth,
  10: ERPArchitecture,
};

// ─── Chapter Component — card-center → slide-to-side animation ───
interface TimelineChapterProps {
  chapter: ChapterData;
  index: number;
}

interface TimelineChapterPropsExtended extends TimelineChapterProps {
  onShowMembers: (m: Member[]) => void;
}

const TimelineChapter = ({ chapter, index, onShowMembers }: TimelineChapterPropsExtended) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const isOdd = index % 2 === 0;
  const AnimComponent = animationComponents[index];

  // Phase 1 → 0: invisible
  // Phase 2 → card appears centered (x: 0, opacity 1)
  // Phase 3 → card slides to side; anim panel slides from opposite side

  const cardVariants = {
    hidden:   { opacity: 0, x: 0, scale: 0.94 },
    center:   { opacity: 1, x: 0, scale: 1,
                transition: { duration: 0.55, ease: 'easeOut' } },
    settled:  {
      opacity: 1,
      x: isOdd ? '-12%' : '12%',
      scale: 1,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 },
    },
  };

  const animPanelVariants = {
    hidden:  { opacity: 0, x: isOdd ? '60%' : '-60%', scale: 0.92 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
    },
  };

  const [phase, setPhase] = useState<'hidden' | 'center' | 'settled'>('hidden');

  useEffect(() => {
    if (!inView) return;
    // Small delay then show card in center
    const t1 = setTimeout(() => setPhase('center'), 80);
    // Then slide to side after card has rendered
    const t2 = setTimeout(() => setPhase('settled'), 680);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`relative min-h-[65vh] flex flex-col md:flex-row items-center gap-8 py-16 px-6 ${
        isOdd ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Year watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-syne font-extrabold" style={{ fontSize: '20vw', opacity: 0.03, color: '#FF5E1A' }}>
          {chapter.year}
        </span>
      </div>

      {/* ── Text card: appears center → slides to side ── */}
      <motion.div
        className={`relative z-10 flex-1 ${isOdd ? 'md:pl-[6vw]' : 'md:pr-[6vw]'}`}
        variants={cardVariants}
        initial="hidden"
        animate={phase}
      >
        {chapter.flagship && (
          <span
            className="inline-block font-mono text-green mb-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
          >
            FLAGSHIP PROJECT
          </span>
        )}

        <div
          className="inline-block font-mono text-orange px-3 py-1 rounded mb-3"
          style={{ fontSize: '0.7rem', background: 'rgba(255,94,26,0.1)' }}
        >
          {chapter.year}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={phase === 'hidden' ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="font-syne font-bold text-2xl md:text-3xl mt-2 mb-4"
        >
          {chapter.title}
        </motion.h3>

        {chapter.extraLabel && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === 'hidden' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="font-mono mb-3"
            style={{
              fontSize: '0.75rem',
              color: chapter.extraLabel.color === 'blue' ? '#007BFF' : '#FF5E1A',
            }}
          >
            {chapter.extraLabel.text}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={phase === 'hidden' ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-mono text-secondary-text leading-relaxed"
          style={{ fontSize: '0.9rem' }}
        >
          {chapter.content}
        </motion.p>

        {chapter.chips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === 'hidden' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.48 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {chapter.chips.map(chip => (
              <span
                key={chip}
                className="font-mono px-2 py-1 rounded"
                style={{
                  fontSize: '0.65rem',
                  background: 'rgba(255,94,26,0.08)',
                  color: '#FF5E1A',
                  border: '1px solid rgba(255,94,26,0.2)',
                }}
              >
                {chip}
              </span>
            ))}
            {chapter.memberIds && chapter.memberIds.length > 0 && (
              <Link
                to={`/team?members=${chapter.memberIds.join(',')}`}
                className="font-mono px-3 py-1 ml-2 rounded nav-link"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#F0F0F0', textDecoration: 'none' }}
              >
                View Team
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* ── Animation panel: slides in from opposite side after card settles ── */}
      <motion.div
        className={`relative z-10 w-full md:w-[320px] h-[200px] md:h-[240px] rounded-lg overflow-hidden ${
          chapter.flagship ? 'ring-1 ring-orange' : ''
        }`}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: chapter.flagship
            ? '1px solid rgba(255,94,26,0.6)'
            : '1px solid rgba(255,255,255,0.06)',
          ...(chapter.flagship ? { animation: 'pulse-glow 3s ease-in-out infinite' } : {}),
        }}
        variants={animPanelVariants}
        initial="hidden"
        animate={phase === 'settled' ? 'visible' : 'hidden'}
      >
        {AnimComponent && <AnimComponent playing={phase === 'settled'} />}
      </motion.div>
    </div>
  );
};

// ─── Timeline Section ───
const TimelineSection = () => {
  return (
    <section id="projects" className="relative py-24">
      <div
        className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px]"
        style={{ background: 'rgba(255,94,26,0.15)' }}
      />

      <div className="text-center mb-16 px-6">
        <p className="label-style mb-4">{'// THE JOURNEY'}</p>
        <h2 className="font-syne font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          Building History
        </h2>
      </div>

      {chapters.map((ch, i) => (
        <TimelineChapter key={i} chapter={ch} index={i} />
      ))}

      <div className="flex flex-col items-center mt-16">
        <div
          className="w-12 h-12 rounded-full border-2"
          style={{
            borderColor: '#FF5E1A',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
        <p className="font-mono text-muted-text mt-4" style={{ fontSize: '0.8rem' }}>
          {'// Timeline ongoing · Next chapter loading...'}
        </p>
      </div>
    </section>
  );
};

export default TimelineSection;
