type IconButtonProps = {
  iconClassName: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const IconButton: React.FC<IconButtonProps> = ({ onClick, iconClassName }) => {
  return (
    <button
      className="button is-primary is-small"
      type="button"
      onClick={onClick}
    >
      <span className="icon">
        <span className={iconClassName} />
      </span>
    </button>
  );
};

export default IconButton;
