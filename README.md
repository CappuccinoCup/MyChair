# MyChair
vue-cli3 front end for 2020 SE
## 第一次提交：从零开始
  1. 使用`vue create my-chair`创建项目，除了 *TypeScript* 和 *PWD* 其他都选中，使用 *history模式*
  2. 创建 **.editorconfig** 文件，设置缩进为2空格
  3. 使用 *Intellij IDEA* 为模板中所有文件在必要的地方加上分号（;）并`Ctrl`+`Alt`+`L`进行reformat
  4. 提交

## 第二次提交：项目迁移
  1. 依据原项目进行配置修改，修改了下列文件：
      - **.browserslistrc** 浏览器列表。不重要。
      - **vue.config.js** vue项目主配置文件。重要。添加代理。
      ```javascript
      devServer: {
        proxy: {
          // 对象名和 vue-cli2 中的 proxyTable 不同
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        },
        host: 'localhost',
        port: 80,
        // open: true, 自动打开浏览器，可以不需要
      }
      ```
      - 其它配置均未修改，使用 *vue-cli3* 默认配置
      - 附上官方[配置参考](https://cli.vuejs.org/zh/config/)
  2. 在 **package.json** 中加入所需依赖，包括 **axios** 、 **element-ui** 和 **qs**
  3. 将原项目中的 **src** 文件夹内容迁移至该模板
  4. 为网页加入标题、图标、新的背景图片
  5. 与后端一起测试，可行
  6. 提交
  
