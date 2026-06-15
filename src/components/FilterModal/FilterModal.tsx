import React, { useState } from 'react';
import './FilterModal.scss';

interface FilterValues {
  orgName: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
}

interface FilterModalProps {
  onFilter: (filters: FilterValues) => void;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onFilter, onClose }) => {
  const [filters, setFilters] = useState<FilterValues>({
    orgName: '',
    username: '',
    email: '',
    date: '',
    phone: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      orgName: '',
      username: '',
      email: '',
      date: '',
      phone: '',
      status: '',
    });
    onFilter({
      orgName: '',
      username: '',
      email: '',
      date: '',
      phone: '',
      status: '',
    });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="filter-modal">
      <div className="filter-modal__field">
        <label>Organization</label>
        <select name="orgName" value={filters.orgName} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Lendsqr">Lendsqr</option>
          <option value="Irorun">Irorun</option>
          <option value="Lendstar">Lendstar</option>
          <option value="Ovaloans">Ovaloans</option>
          <option value="Mpower">Mpower</option>
        </select>
      </div>

      <div className="filter-modal__field">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="User"
          value={filters.username}
          onChange={handleChange}
        />
      </div>

      <div className="filter-modal__field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
        />
      </div>

      <div className="filter-modal__field">
        <label>Date</label>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={filters.date}
          onChange={handleChange}
        />
      </div>

      <div className="filter-modal__field">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={filters.phone}
          onChange={handleChange}
        />
      </div>

      <div className="filter-modal__field">
        <label>Status</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className="filter-modal__buttons">
        <button className="filter-modal__reset" onClick={handleReset}>
          Reset
        </button>
        <button className="filter-modal__filter" onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterModal;