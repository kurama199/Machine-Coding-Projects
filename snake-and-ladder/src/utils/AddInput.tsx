interface AddInputProps {
  title: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

export const AddInput: React.FC<AddInputProps> = ({
  title,
  name,
  type = "number",
  min = 0,
  max = 0,
  placeholder = "",
}) => {
  return (
    <div className="px-5 pt-5 flex items-start">
      <span className="font-semibold font-sans mr-5 text-xl">{title}</span>
      {type == "number" ? (
        <input
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          name={name}
          required
          onInput={(e) => {
            const { value, min, max } = e.target as HTMLInputElement;
            if (Number(value) > Number(max)) {
              (e.target as HTMLInputElement).value = max;
            } else if (Number(value) < Number(min)) {
              (e.target as HTMLInputElement).value = min;
            }
          }}
          className="rounded-4xl w-3/10 px-4 py-0.5 border-2 border-solid border-black/40 focus:outline-hidden focus:border-black/80 transition-colors duration-100"
        />
      ) : type == "text" ? (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          required
          className="rounded-4xl w-3/10 px-4 py-0.5 border-2 border-solid border-black/40 focus:outline-hidden focus:border-black/80 transition-colors duration-100"
        />
      ) : null}
    </div>
  );
};
