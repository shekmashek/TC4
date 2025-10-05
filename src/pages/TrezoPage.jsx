import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetTracker from '../components/BudgetTracker';
import { useUI } from '../context/UIContext';
import { useData } from '../context/DataContext';
import { updateProjectOnboardingStep } from '../context/actions';
import { useActiveProjectData } from '../utils/selectors';
import { Lock, PiggyBank, Banknote, Coins } from 'lucide-react';

const TrezoPage = () => {
    const { uiState, uiDispatch } = useUI();
    const { dataState, dataDispatch } = useData();
    const navigate = useNavigate();
    const { activeProjectId } = uiState;

    const { activeProject } = useActiveProjectData(dataState, uiState);
    const [quickFilter, setQuickFilter] = useState('all');

    const handleValidation = () => {
        updateProjectOnboardingStep({ dataDispatch, uiDispatch }, { projectId: activeProjectId, step: 'flux' });
        navigate('/app/flux');
    };
    
    const showValidationButton = activeProject && activeProject.onboarding_step === 'trezo';

    const filterOptions = [
        { id: 'all', label: 'Tout', color: 'bg-white shadow text-blue-600', hoverColor: '' },
        { id: 'provisions', label: 'Provisions', icon: Lock, color: 'bg-indigo-100 text-indigo-700', hoverColor: 'hover:bg-indigo-200' },
        { id: 'savings', label: 'Épargnes', icon: PiggyBank, color: 'bg-teal-100 text-teal-700', hoverColor: 'hover:bg-teal-200' },
        { id: 'borrowings', label: 'Emprunts', icon: Banknote, color: 'bg-red-100 text-red-700', hoverColor: 'hover:bg-red-200' },
        { id: 'lendings', label: 'Prêts', icon: Coins, color: 'bg-green-100 text-green-700', hoverColor: 'hover:bg-green-200' },
    ];

    return (
        <div className="p-6 max-w-full">
            <div className="mb-8">
                <p className="text-gray-600 max-w-4xl">
                    Anticiper les déficits et les surplus de trésorerie : Identifier les périodes de tension ou d'abondance de liquidités pour planifier les actions nécessaires.
                </p>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {filterOptions.map(opt => {
                        const Icon = opt.icon;
                        return (
                            <button 
                                key={opt.id}
                                onClick={() => setQuickFilter(opt.id)} 
                                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${quickFilter === opt.id ? opt.color : `bg-gray-100 text-gray-700 ${opt.hoverColor}`}`}
                            >
                                {Icon && <Icon size={14} />}
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
                {showValidationButton && (
                    <button
                        onClick={handleValidation}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                    >
                        Valider mon tableau et voir mon flux de trésorerie
                    </button>
                )}
            </div>
            <BudgetTracker quickFilter={quickFilter} />
        </div>
    );
};

export default TrezoPage;
