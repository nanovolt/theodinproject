"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer((req, res) => {
    let filePath = path_1.default.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
    let extName = path_1.default.extname(filePath);
    let contentType = "text/html";
    switch (extName) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }
    fs_1.default.readFile(filePath, (err, content) => {
        if (err) {
            if ((err.code = "ENOENT")) {
                fs_1.default.readFile(path_1.default.join(__dirname, "public", "404.html"), (err, content) => {
                    res.writeHead(404, { contentType: contentType });
                    res.write(content);
                    res.end();
                });
            }
            else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            res.writeHead(200, { "Content-Type": contentType });
            res.write(content);
            res.end();
        }
    });
});
server.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
});
//# sourceMappingURL=index_node.js.map