/**
 * Props for the `BasicFormSkeleton` component.
 *
 * @property {number} numberOfFields - The number of form fields to render skeleton loaders for.
 */
type BasicFormSkeletonProps = {
  numberOfFields: number;
};

/**
 * A React component that renders a skeleton loader for a form.
 * It generates placeholder elements to simulate the loading state of a form with a given number of fields.
 *
 * @param {BasicFormSkeletonProps} props - The properties for the component, including `numberOfFields` to determine how many skeleton items to render.
 * @returns {JSX.Element} A JSX element that renders a series of skeleton placeholders for form fields and a submit button.
 */

export default function BasicFormSkeleton({
  numberOfFields,
}: BasicFormSkeletonProps) {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: numberOfFields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-28 bg-gray-300 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      ))}
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
    </div>
  );
}
