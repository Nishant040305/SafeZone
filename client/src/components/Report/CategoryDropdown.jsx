const CategoryDropdown = ({ value, onChange }) => {
  const categories = ["Earthquake", "Flood", "Fire", "Tornado", "Other"];
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Category</label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
