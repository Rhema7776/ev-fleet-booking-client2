interface CategoryVehicleIllustrationProps {
  category: "ECONOMY" | "EXECUTIVE" | "VIP";
  className?: string;
}

/**
 * Shown when a vehicle has no uploaded photo yet. Deliberately a simple,
 * custom flat illustration per category rather than a stock/AI-generated
 * car photo — no copyright or brand-likeness risk, and it reads honestly
 * as "no photo yet" rather than implying this is what the actual vehicle
 * looks like (which a mismatched photo would).
 */
const CategoryVehicleIllustration = ({
  category,
  className,
}: CategoryVehicleIllustrationProps) => {
  if (category === "EXECUTIVE") {
    return (
      <svg viewBox="0 0 120 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="70" fill="#F4F4F5" />
        <ellipse cx="60" cy="52" rx="42" ry="4" fill="#E4E4E7" />
        <path
          d="M20 46c0-3 2-5 5-5h6l8-14c2-3 5-5 9-5h24c4 0 7 2 9 5l8 14h6c3 0 5 2 5 5v6c0 2-2 4-4 4H24c-2 0-4-2-4-4v-6z"
          fill="#3F3F46"
        />
        <path d="M42 27l-6 9h48l-6-9c-1-2-3-3-5-3H47c-2 0-4 1-5 3z" fill="#71717A" />
        <circle cx="36" cy="56" r="7" fill="#18181B" />
        <circle cx="36" cy="56" r="3" fill="#A1A1AA" />
        <circle cx="84" cy="56" r="7" fill="#18181B" />
        <circle cx="84" cy="56" r="3" fill="#A1A1AA" />
      </svg>
    );
  }

  if (category === "VIP") {
    return (
      <svg viewBox="0 0 120 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="70" fill="#FFFBEB" />
        <ellipse cx="60" cy="53" rx="46" ry="4" fill="#FDE68A" opacity="0.5" />
        <path
          d="M14 47c0-3 2-5 5-5h8l10-15c2-3 6-5 10-5h30c4 0 8 2 10 5l10 15h8c3 0 5 2 5 5v6c0 2-2 4-4 4H18c-2 0-4-2-4-4v-6z"
          fill="#292524"
        />
        <path d="M40 27l-7 10h56l-7-10c-2-3-5-4-8-4H48c-3 0-6 1-8 4z" fill="#57534E" />
        <rect x="52" y="14" width="16" height="4" rx="2" fill="#F59E0B" />
        <circle cx="34" cy="57" r="7.5" fill="#18181B" />
        <circle cx="34" cy="57" r="3" fill="#F59E0B" />
        <circle cx="86" cy="57" r="7.5" fill="#18181B" />
        <circle cx="86" cy="57" r="3" fill="#F59E0B" />
      </svg>
    );
  }

  // ECONOMY — the default
  return (
    <svg viewBox="0 0 120 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="70" fill="#F0F9FF" />
      <ellipse cx="60" cy="51" rx="38" ry="4" fill="#E0F2FE" />
      <path
        d="M24 45c0-3 2-5 5-5h4l7-11c2-2 4-4 7-4h20c3 0 5 2 7 4l7 11h4c3 0 5 2 5 5v5c0 2-2 4-4 4H28c-2 0-4-2-4-4v-5z"
        fill="#0EA5E9"
      />
      <path d="M44 29l-5 7h42l-5-7c-1-2-3-2-5-2H49c-2 0-4 0-5 2z" fill="#7DD3FC" />
      <circle cx="38" cy="54" r="6.5" fill="#0C4A6E" />
      <circle cx="38" cy="54" r="2.5" fill="#BAE6FD" />
      <circle cx="82" cy="54" r="6.5" fill="#0C4A6E" />
      <circle cx="82" cy="54" r="2.5" fill="#BAE6FD" />
    </svg>
  );
};

export default CategoryVehicleIllustration;
