import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

const AppWrapper = ({ children }: {
  children: ReactNode
}) => {
  return <MantineProvider withGlobalStyles withNormalizeCSS>
    <ModalsProvider>
      <Notifications position='top-right' autoClose={5000}/>
      {children}
    </ModalsProvider>
  </MantineProvider>
}

export default AppWrapper