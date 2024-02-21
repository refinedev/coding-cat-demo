import { Authenticated, CanAccess, Refine } from "@refinedev/core";

import {
  useNotificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
  ThemedTitleV2,
} from "@refinedev/antd";

import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider, {
  GraphQLClient,
  liveProvider,
} from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";

const client = new GraphQLClient("https://api.nestjs-query.refine.dev/graphql");
const wsClient = createClient({
  url: "wss://api.nestjs-query.refine.dev/graphql",
});

import { ConfigProvider, App as AntdApp, Typography } from "antd";
import "@refinedev/antd/dist/reset.css";
import { BlogPostsList } from "./pages/blog-posts/list";
import { BlogPostEdit } from "./pages/blog-posts/edit";
import { authProvider } from "./providers/auth-provider";
import { accessControlProvider } from "./providers/access-control-provider";
import { codingCatIcon } from "./coding-cat-icon";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            dataProvider={dataProvider(client)}
            liveProvider={liveProvider(wsClient)}
            authProvider={authProvider}
            accessControlProvider={accessControlProvider}
            options={{
              syncWithLocation: true,
              liveMode: "auto",
            }}
            resources={[
              {
                name: "blog-posts",
                list: "/blog-posts",
                edit: "/blog-posts/:id/edit",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated key="authenticated-routes">
                    <ThemedLayoutV2
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          icon={codingCatIcon}
                          text="Coding Cat Demo"
                        />
                      )}
                    >
                      <CanAccess fallback={<ErrorComponent />}>
                        <Outlet />
                      </CanAccess>
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource />} />
                <Route path="/blog-posts">
                  <Route index element={<BlogPostsList />} />
                  <Route path=":id/edit" element={<BlogPostEdit />} />
                </Route>
              </Route>
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@demo.com",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
