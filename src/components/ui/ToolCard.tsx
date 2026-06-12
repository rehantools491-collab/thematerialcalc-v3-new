import Link from 'next/link';

interface ToolCardProps {
  name: string;
  slug: string;
  description: string;
  color: 'orange' | 'blue' | 'green' | 'pink' | 'purple';
  cta: string;
}

const COLOR_MAP = {
  orange: 'bg-orange-light text-orange',
  blue: 'bg-[#E6F1FB] text-info',
  green: 'bg-[#ECFDF5] text-success',
  pink: 'bg-[#FBEAF0] text-[#D4537E]',
  purple: 'bg-[#EEEDFE] text-[#534AB7]',
} as const;

export default function ToolCard({ name, slug, description, color, cta }: ToolCardProps) {
  return (
    <Link href={slug} className="tool-card group">
      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-lg mb-3 ${COLOR_MAP[color]}`}>
        ■
      </div>
      <h3 className="text-[15px] font-semibold text-navy mb-1.5">{name}</h3>
      <p className="text-[13px] text-gray-400 leading-relaxed mb-3">{description}</p>
      <span className="text-[13px] font-semibold text-orange inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {cta}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
