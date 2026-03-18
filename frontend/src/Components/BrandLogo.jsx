function BrandLogo({ className = "" }) {
  return (
    <span
      className={`brand-logo ${className}`.trim()}
      aria-label="Livate Academy"
    >
      <span className="brand-logo__mark" aria-hidden="true">
        <span className="brand-logo__stroke brand-logo__stroke--primary" />
        <span className="brand-logo__stroke brand-logo__stroke--accent" />
        <span className="brand-logo__stroke brand-logo__stroke--secondary" />
      </span>
      <span className="brand-logo__text">
        <span className="brand-logo__title">LIVATE</span>
        <span className="brand-logo__subtitle">ACADEMY</span>
      </span>
    </span>
  );
}

export default BrandLogo;
