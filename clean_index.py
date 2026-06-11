import sys

with open("index.html", "r") as f:
    lines = f.readlines()

new_lines = []
new_lines.extend(lines[0:2])
new_lines.extend(lines[2821:2843])
new_lines.append("</head>\n")
new_lines.append('<body class="">\n')
new_lines.extend(lines[19315:19782])
new_lines.append('</body>\n</html>\n')

with open("index.html", "w") as f:
    f.writelines(new_lines)
print("Done")
