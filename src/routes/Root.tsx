import { Link, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Root = () => {
  return (
    <>
      <div className="debug-0">
        <NavigationMenu className="debug-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="about">About</Link>
              {/* <NavigationMenuLink>About</NavigationMenuLink> */}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Contact</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/articles">Articles</Link>
              {/* <NavigationMenuLink>Articles</NavigationMenuLink> */}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>Plays</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* <nav>
          <ul className="flex flex-row gap-4">
            <li>
              <Link to="about">About</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          </ul>
        </nav> */}
        <div className="debug-1">
          <p>This is Root page</p>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
