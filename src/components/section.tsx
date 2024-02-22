type Props = {
  children: React.ReactNode,
	// eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  disabled?: boolean,
	// eslint-disable-next-line react/require-default-props
  loading?: boolean
}

const Section = ({ children, loading }: Props) => (
  <section className={loading ? "" : ""}>
    {children}
    <style>{`
      section {
        padding: var(--gap);
      }
    `}</style>
  </section>
)

export default Section
