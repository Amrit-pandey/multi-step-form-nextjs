interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} `}>
      <div className="text-4xl font-bold">{title}</div>
      <div className="text-lg text-zinc-400 pt-3">{subtitle}</div>
    </div>
  );
};

export default Heading;
