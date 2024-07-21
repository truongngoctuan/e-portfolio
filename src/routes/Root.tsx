import { Link, LinkProps, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Root = () => {
  return (
    <div className="debug-0">
      <NavigationMenu className="debug-1 relative z-[1] flex w-screen justify-center">
        <NavigationMenuList className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-2">
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/about">About</MenuItem>
          <MenuItem to="/articles">Articles</MenuItem>
          <MenuItem to="/plays">Plays</MenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="debug-1 p-4 bg-orange-300">
        <p>This is Root page Outlet</p>
        <div className="bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const MenuItem = (props: LinkProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "text-orange-950 hover:bg-amber-200 focus:shadow-amber-300 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_1px]",
            props.className
          )}
          {...props}
        >
          {props.children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default Root;
