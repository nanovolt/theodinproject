import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import BlockQuote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import History from "@tiptap/extension-history";

const lowlight = createLowlight(common);

lowlight.register({ html });
lowlight.register({ css });
lowlight.register({ js });
lowlight.register({ ts });

export const extensions = [
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Strike,
  BlockQuote,
  BulletList,
  ListItem,
  OrderedList,
  Link.configure({
    openOnClick: false,
  }),
  HorizontalRule,
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right"],
  }),
  Code.configure({
    HTMLAttributes: {
      class: "code",
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: "codeblock",
    },
  }),
  History,
];
