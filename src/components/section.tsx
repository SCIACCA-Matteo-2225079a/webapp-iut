type Props = {
  children: React.ReactNode,
  disabled?: boolean,
  loading?: boolean
}

const Section = ({ children, disabled, loading }: Props) => (
  <section className={loading ? "pointer-events-none" : ""}>
    {children}
    <style jsx>{`
      section {
        padding: var(--gap);
      }
    `}</style>
  </section>
)

export default Section
