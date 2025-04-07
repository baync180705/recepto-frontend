import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setSelectedLocations, setMinimumScore } from '../slices/filter_slice';
import { locations } from '../data/locations';
import { scoreOptions } from '../data/score';

interface FilterBoxProps {
  onClose: () => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const selectedLocationsFromStore = useSelector((state: RootState) => state.locationFilter.selectedLocations);
  const selectedScoreRangeFromStore = useSelector((state: RootState) => state.locationFilter.minScore);

  const [selectedLocations, setSelectedLocationsState] = useState(locations);
  const [minScore, setMinScore] = useState<number>(0);

  useEffect(() => {
    const updatedLocations = locations.map(location => ({
      ...location,
      selected: selectedLocationsFromStore.includes(location.name.toLowerCase()),
    }));
    setSelectedLocationsState(updatedLocations);
    setMinScore(selectedScoreRangeFromStore);
  }, [selectedLocationsFromStore, selectedScoreRangeFromStore]);

  const handleLocationSelect = (id: number) => {
    const updatedLocations = selectedLocations.map(location =>
      location.id === id ? { ...location, selected: !location.selected } : location
    );
    setSelectedLocationsState(updatedLocations);
  };

  const handleScoreSelect = (minScore: number) => {
    setMinScore(minScore);
  };

  const handleApplyFilters = () => {
    const selectedLocationNames = selectedLocations
      .filter(location => location.selected)
      .map(location => location.name.toLowerCase());
    dispatch(setSelectedLocations(selectedLocationNames));

    if (minScore > 0) {
      dispatch(setMinimumScore(minScore));
    }

    onClose();
  };

  const handleClearFilters = () => {
    setSelectedLocationsState(locations.map(location => ({ ...location, selected: false })));
    setMinScore(0);

    dispatch(setSelectedLocations([]));
    dispatch(setMinimumScore(0));
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">Filters</h4>
          <button
            className="text-sm text-red-600 hover:underline"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
        <div className="grid grid-cols-2 gap-4">
          {selectedLocations.map(location => (
            <div key={location.id} className="flex items-center">
              <input
                type="checkbox"
                id={`location-${location.id}`}
                checked={location.selected}
                onChange={() => handleLocationSelect(location.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={`location-${location.id}`} className="ml-2 text-sm text-gray-700">
                {location.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Score Range</h4>
        <div className="space-y-2">
          {scoreOptions.map(option => (
            <div key={option.id} className="flex items-center">
              <input
                type="radio"
                id={`score-${option.id}`}
                name="score"
                checked={minScore === option.min}
                onChange={() => handleScoreSelect(option.min)}
                className="w-4 h-4 text-blue-600 border-gray-300"
              />
              <label htmlFor={`score-${option.id}`} className="ml-2 text-sm text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center text-sm text-blue-600 hover:underline"
          onClick={handleClearFilters}
        >
          <span>Remove Filters</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBox;