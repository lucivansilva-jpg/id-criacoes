import React from 'react';
import { WebsiteModel } from '../types';
import { ThemeConfig } from '../theme';
import { VitrineSection } from './VitrineSection';

interface ModelsPageProps {
  models: WebsiteModel[];
  categories: string[];
  activeTheme: ThemeConfig;
  onOpenPreview: (model: WebsiteModel) => void;
  onOrderModel: (modelTitle: string) => void;
  isAdmin?: boolean;
  inlineEditMode?: boolean;
  onOpenManageModels?: () => void;
  onNavigateHome: () => void;
}

export function ModelsPage({
  models,
  categories,
  activeTheme,
  onOpenPreview,
  onOrderModel,
  isAdmin,
  inlineEditMode,
  onOpenManageModels,
  onNavigateHome
}: ModelsPageProps) {
  return (
    <div className={`pt-24 pb-16 ${activeTheme.pageBg} transition-colors min-h-screen`}>
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`text-xs font-bold ${activeTheme.textMuted} hover:${activeTheme.textPrimary} transition-colors cursor-pointer`}
          >
            Início
          </button>
          <span className={activeTheme.textMuted}>/</span>
          <span className={`text-xs font-bold ${activeTheme.accentText}`}>
            Modelos de Sites
          </span>
        </div>
      </div>

      {/* Full Vitrine Section (with Marquee when 'Todos' selected and static grid when filtering) */}
      <VitrineSection
        models={models}
        categories={categories}
        activeTheme={activeTheme}
        onOpenPreview={onOpenPreview}
        onOrderModel={onOrderModel}
        isAdmin={isAdmin}
        inlineEditMode={inlineEditMode}
        onOpenManageModels={onOpenManageModels}
        isHomeHighlight={false}
      />
    </div>
  );
}
