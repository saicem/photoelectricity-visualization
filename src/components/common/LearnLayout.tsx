import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, FlaskConical } from 'lucide-react';

export interface LearnChapter {
  path: string;
  title: string;
  icon: React.ReactNode;
}

interface LearnLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  prevChapter?: LearnChapter;
  nextChapter?: LearnChapter;
  currentIndex: number;
  totalChapters: number;
  playgroundPath?: string;
}

export default function LearnLayout({
  title,
  subtitle,
  children,
  prevChapter,
  nextChapter,
  currentIndex,
  totalChapters,
  playgroundPath,
}: LearnLayoutProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-lab-muted mb-4">
          <BookOpen className="w-4 h-4 text-laser-cyan" />
          <span>学习路径</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-laser-cyan">
            第 {currentIndex + 1} / {totalChapters} 章
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold font-display text-lab-text mb-2"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-lg text-lab-muted"
            >
              {subtitle}
            </motion.p>
          </div>
          {playgroundPath && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              onClick={() => navigate(playgroundPath)}
              className="flex items-center gap-2 px-4 py-2 bg-lab-surface border border-lab-border rounded-xl text-sm text-lab-muted hover:text-laser-cyan hover:border-laser-cyan/30 transition-all flex-shrink-0"
            >
              <FlaskConical className="w-4 h-4" />
              去实验
            </motion.button>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        {children}
      </motion.div>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <div>
          {prevChapter && (
            <Link
              to={prevChapter.path}
              className="block p-5 bg-lab-surface/50 border border-lab-border rounded-xl hover:border-laser-cyan/50 transition-all group"
            >
              <div className="flex items-center gap-2 text-sm text-lab-muted mb-2">
                <ArrowLeft className="w-4 h-4" />
                上一章
              </div>
              <div className="font-semibold text-lab-text group-hover:text-laser-cyan transition-colors flex items-center gap-2">
                {prevChapter.icon}
                {prevChapter.title}
              </div>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextChapter && (
            <Link
              to={nextChapter.path}
              className="block p-5 bg-lab-surface/50 border border-lab-border rounded-xl hover:border-laser-purple/50 transition-all group"
            >
              <div className="flex items-center justify-end gap-2 text-sm text-lab-muted mb-2">
                下一章
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="font-semibold text-lab-text group-hover:text-laser-purple transition-colors flex items-center justify-end gap-2">
                {nextChapter.title}
                {nextChapter.icon}
              </div>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
