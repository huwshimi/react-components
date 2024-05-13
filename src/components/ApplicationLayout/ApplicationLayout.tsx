import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type { ReactNode } from "react";
import { useState, type HTMLProps, type PropsWithChildren } from "react";

import Panel from "components/Panel";
import type { PanelProps } from "components/Panel";
import type { PanelLogoDefaultElement } from "components/Panel";
import type { ExclusiveProps } from "types";

import type { SideNavigationProps } from "../SideNavigation";
import SideNavigation from "../SideNavigation";
import type { SideNavigationLinkDefaultElement } from "../SideNavigation/SideNavigationLink/index";

import AppMain from "./AppMain";
import AppNavigation from "./AppNavigation";
import AppNavigationBar from "./AppNavigationBar";
import AppStatus from "./AppStatus";
import Application from "./Application";
import Button from "components/Button";
import Icon from "components/Icon";

export type BaseProps<
  NI = SideNavigationLinkDefaultElement,
  PL = PanelLogoDefaultElement,
> = PropsWithSpread<
  {
    aside?: ReactNode;
    dark?: boolean;
    logo: NonNullable<PanelProps<PL>["logo"]>;
    navLinkComponent?: SideNavigationProps<NI>["linkComponent"];
    menuCollapsed?: boolean;
    menuPinned?: boolean;
    navPanelClassName?: string;
    onCollapseMenu?: (menuCollapsed: boolean) => void;
    onPinMenu?: (menuPinned: boolean) => void;
    status?: ReactNode;
  } & PropsWithChildren,
  HTMLProps<HTMLDivElement>
>;

export type Props<
  NI = SideNavigationLinkDefaultElement,
  PL = PanelLogoDefaultElement,
> = BaseProps<NI, PL> &
  ExclusiveProps<
    {
      navItems: NonNullable<SideNavigationProps<NI>["items"]>;
    },
    {
      sideNavigation: ReactNode;
    }
  >;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 */
const ApplicationLayout = <
  NI = SideNavigationLinkDefaultElement,
  PL = PanelLogoDefaultElement,
>({
  aside,
  children,
  dark = true,
  logo,
  menuCollapsed,
  menuPinned,
  navLinkComponent,
  navItems,
  navPanelClassName,
  onCollapseMenu,
  onPinMenu,
  sideNavigation,
  status,
  ...props
}: Props<NI, PL>) => {
  const [internalMenuPinned, setInternalMenuPinned] = useState(false);
  const [internalMenuCollapsed, setInternalMenuCollapsed] = useState(true);
  const menuIsPinned = menuPinned ?? internalMenuPinned;
  const setMenuPinned = onPinMenu ?? setInternalMenuPinned;
  const menuIsCollapsed = menuCollapsed ?? internalMenuCollapsed;
  const setMenuCollapsed = onCollapseMenu ?? setInternalMenuCollapsed;

  return (
    <Application {...props}>
      <AppNavigationBar>
        <Panel<PL>
          dark={dark}
          logo={logo}
          toggle={{
            label: "Menu",
            onClick: () => setMenuCollapsed(!menuIsCollapsed),
          }}
        />
      </AppNavigationBar>
      <AppNavigation collapsed={menuIsCollapsed} pinned={menuIsPinned}>
        <Panel<PL>
          className={navPanelClassName}
          dark={dark}
          controls={
            <>
              <Button
                hasIcon
                appearance="base"
                className={classNames("u-no-margin u-hide--medium", {
                  "is-dark": dark,
                })}
                onClick={(evt) => {
                  setMenuCollapsed(true);
                  evt.currentTarget.blur();
                }}
              >
                <Icon name="close" className={classNames({ "is-light": dark })}>
                  Close menu
                </Icon>
              </Button>
              <Button
                hasIcon
                appearance="base"
                className={classNames("u-no-margin u-hide--small", {
                  "is-dark": dark,
                })}
                onClick={() => {
                  setMenuPinned(!menuIsPinned);
                }}
              >
                <Icon
                  name={menuIsPinned ? "close" : "pin"}
                  className={classNames({ "is-light": dark })}
                >
                  {menuIsPinned ? "Unpin menu" : "Pin menu"}
                </Icon>
              </Button>
            </>
          }
          controlsClassName="u-hide--large"
          stickyHeader
          logo={logo}
        >
          {navItems ? (
            <SideNavigation<NI>
              dark={dark}
              items={navItems}
              linkComponent={navLinkComponent}
            />
          ) : (
            sideNavigation
          )}
        </Panel>
      </AppNavigation>
      <AppMain>{children}</AppMain>
      {aside}
      {status ? <AppStatus>{status}</AppStatus> : null}
    </Application>
  );
};

export default ApplicationLayout;
