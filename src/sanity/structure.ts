import type { StructureResolver } from "sanity/structure";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faClipboard,
  faNewspaper,
  faRectangleList,
  faCircleUser,
  faWindowMaximize
} from "@fortawesome/free-regular-svg-icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("site")
        .title("Site")
        .icon(() => React.createElement(FontAwesomeIcon, { icon: faWindowMaximize })),
      S.documentTypeListItem("projectPost")
        .title("Projects")
        .icon(() =>
          React.createElement(FontAwesomeIcon, { icon: faClipboard })
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "category", "author", "projectPost", "site"].includes(
            item.getId()!
          )
      ),
      S.documentTypeListItem("post")
        .title("Posts")
        .icon(() =>
          React.createElement(FontAwesomeIcon, { icon: faNewspaper })
        ),
      S.documentTypeListItem("category")
        .title("Categories")
        .icon(() =>
          React.createElement(FontAwesomeIcon, { icon: faRectangleList })
        ),
      S.documentTypeListItem("author")
        .title("Authors")
        .icon(() => React.createElement(FontAwesomeIcon, { icon: faCircleUser })),
    ]);
