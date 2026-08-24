export default function ProcessSteps({ steps }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <article key={step.n} className="border-t pt-6" style={{ borderColor: "var(--line)" }}>
          <p className="font-display text-[32px] font-bold" style={{ color: "var(--color-accent)" }}>
            {step.n}.
          </p>
          <h3 className="mt-3 font-display text-[26px] uppercase leading-[1.2]">{step.title}</h3>
          <p className="mt-3 text-[16px] font-light leading-[1.55]">{step.body}</p>
        </article>
      ))}
    </div>
  )
}
