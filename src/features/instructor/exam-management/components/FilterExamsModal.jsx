import { X } from "lucide-react";
import { useState } from "react";

const FilterExamsModal = ({
  subjects,
  searchParams,
  setSearchParams,
  setIsFilterOpen,
  tabs,
  lists,
}) => {
  const [activeTab, setActiveTab] = useState("status");

  const renderContent = () => {
    const list = lists[activeTab] || [];
    const currentValue = searchParams.get(activeTab) || "all";

    return (
      <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4'>
        {list.map((item) => {
          const itemValue = item.toLowerCase();
          const isSelected = currentValue === itemValue;

          return (
            <button
              onClick={() => {
                if (itemValue === "all") {
                  searchParams.delete(activeTab);
                } else {
                  searchParams.set(activeTab, itemValue);
                }
                setSearchParams(searchParams);
                setIsFilterOpen(false);
              }}
              key={item}
              className={`bg-surface-2 border-border text-text cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all sm:text-base ${
                isSelected
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "hover:border-primary/50 hover:bg-primary/10"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className='flex min-h-75 overflow-hidden'>
      {/* Side Tabs */}
      <div className='bg-surface-2 border-border w-4/12 border-r py-4 sm:w-3/12'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-text w-full cursor-pointer px-6 py-4 text-center text-base font-medium transition-colors sm:text-lg ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary border-primary border-r-2"
                : "text-muted hover:bg-surface/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className='bg-surface w-2/3 p-6'>
        {/* Active Filters */}
        <div className='mb-4 flex flex-wrap gap-2'>
          {tabs.map(({ id, label }) => {
            const val = searchParams.get(id);
            if (!val) return null;
            return (
              <span
                key={id}
                className='bg-primary/10 text-primary border-primary/30 flex items-center gap-1 rounded-full border px-3 py-1'
              >
                {label}: {val}
                <button
                  onClick={() => {
                    searchParams.delete(id);
                    setSearchParams(searchParams);
                  }}
                  className='hover:text-danger cursor-pointer'
                >
                  <X size={16} />
                </button>
              </span>
            );
          })}
        </div>

        <h3 className='text-muted text-md mb-6 font-semibold tracking-wider uppercase'>
          Select {activeTab}
        </h3>
        {renderContent()}
      </div>
    </div>
  );
};

export default FilterExamsModal;
