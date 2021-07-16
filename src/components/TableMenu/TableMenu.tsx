import classNames from "classnames";

import ContextualMenu from "../ContextualMenu";
import type { Props as ContextualMenuProps } from "../ContextualMenu/ContextualMenu";

export type Props<L = null> = {
  className?: ContextualMenuProps<L>["className"] | null;
  disabled?: ContextualMenuProps<L>["toggleDisabled"] | null;
  links?: ContextualMenuProps<L>["links"] | null;
  onToggleMenu?: ContextualMenuProps<L>["onToggleMenu"] | null;
  position?: ContextualMenuProps<L>["position"] | null;
  positionNode?: ContextualMenuProps<L>["positionNode"] | null;
  title?: string | null;
};

const TableMenu = <L extends null>({
  className,
  disabled = false,
  links,
  title,
  onToggleMenu,
  position = "left",
  positionNode,
}: Props<L>): JSX.Element => {
  // If there are no links then make it an empty array so that it can be validly spread below.
  links = links || [];
  return (
    <ContextualMenu
      className={classNames("p-table-menu", className)}
      hasToggleIcon
      links={[
        ...(title ? [title] : []),
        ...(Array.isArray(links) ? links : [links]),
      ]}
      onToggleMenu={onToggleMenu}
      position={position}
      positionNode={positionNode}
      toggleAppearance="base"
      toggleClassName="u-no-margin--bottom p-table-menu__toggle"
      toggleDisabled={disabled}
    />
  );
};

export default TableMenu;
