export const LinksGenerator = ({ url, name }) => {
  return (
    <li>
      <a href={url}>{name}</a>
    </li>
  );
};
