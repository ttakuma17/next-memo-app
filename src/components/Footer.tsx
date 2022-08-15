import { Flex, FlexProps } from '@chakra-ui/react'

// 画面下部に固定してあげる → 幅はOK

export const Footer = (props: FlexProps) => (
  <Flex as="footer" bg="cyan.600" color="gray.50" py="1rem" {...props} />
)
