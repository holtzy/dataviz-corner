type SideBarTitleProps = {
  title: string;
};

export const SideBarTitle = ({ title }: SideBarTitleProps) => {
  return <p className="font-bold uppercase text-blue-100 text-sm">{title}</p>;
};
