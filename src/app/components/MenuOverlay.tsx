import React from 'react'
import NavLink from './NavLink'

interface Link {
  path: string;
  title: string;
}

interface MenuOverlayProps {
  links: Link[];
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, id) => {
        return (
          <li key={id}>
            <NavLink href={link.path} title={link.title} />
          </li>
        )
      })}
    </ul>
  )
}

export default MenuOverlay
