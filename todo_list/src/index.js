import "./index.css";
import Main from "./main";
import Footer from "./footer";
import TaskProdiver from "./task_provider";
import TasksWindow from "./tasks_window";

const tp = TaskProdiver();
const tw = TasksWindow();
const main = Main(tp, tw);
const footer = Footer();

main.initializeComponent();
footer.initializeComponent();
