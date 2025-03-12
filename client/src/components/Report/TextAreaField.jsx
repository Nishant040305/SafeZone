const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
      rows="4"
    ></textarea>
  </div>
);

export default TextAreaField;
