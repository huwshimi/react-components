import { useRef } from "react";
import type { ReactNode } from "react";
import classNames from "classnames";

import TableMenu from "../TableMenu";
import type { Props as TableMenuProps } from "../TableMenu/TableMenu";

type Props<L> = {
  className?: string | null;
  icon?: ReactNode | null;
  iconSpace?: boolean | null;
  menuClassName?: string | null;
  menuLinks?: TableMenuProps<L>["links"] | null;
  menuTitle?: string | null;
  onToggleMenu?: TableMenuProps<L>["onToggleMenu"] | null;
  primary?: ReactNode | null;
  primaryAriaLabel?: string | null;
  primaryClassName?: string | null;
  primaryTextClassName?: string | null;
  primaryTitle?: string | null;
  secondary?: ReactNode | null;
  secondaryAriaLabel?: string | null;
  secondaryClassName?: string | null;
  secondaryTitle?: string | null;
};

const DoubleRow = <L,>({
  className,
  icon,
  iconSpace,
  menuClassName,
  menuLinks,
  menuTitle,
  onToggleMenu,
  primary,
  primaryAriaLabel,
  primaryClassName,
  primaryTextClassName,
  primaryTitle,
  secondary,
  secondaryAriaLabel,
  secondaryClassName,
  secondaryTitle,
}: Props<L>): JSX.Element => {
  const parent = useRef(null);
  const hasIcon = icon || iconSpace;

  return (
    <div
      className={classNames(
        {
          "p-double-row": !hasIcon,
          "p-double-row--with-icon": hasIcon,
        },
        className
      )}
    >
      {hasIcon ? (
        <div className="p-double-row__icon">
          {icon || <div className="p-double-row__icon-space"></div>}
        </div>
      ) : null}
      <div className="p-double-row__rows-container">
        <div
          aria-label={primaryAriaLabel}
          className={primaryClassName}
          ref={parent}
        >
          <div
            className={classNames("u-truncate", primaryTextClassName)}
            title={primaryTitle}
          >
            {primary}
          </div>
          {menuLinks ? (
            <TableMenu
              className={menuClassName}
              links={menuLinks}
              onToggleMenu={onToggleMenu}
              positionNode={parent.current}
              title={menuTitle}
            />
          ) : null}
        </div>
        {secondary ? (
          <div
            aria-label={secondaryAriaLabel}
            className={classNames("u-truncate", secondaryClassName)}
            data-test="secondary-row"
            title={secondaryTitle}
          >
            {secondary}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DoubleRow;
