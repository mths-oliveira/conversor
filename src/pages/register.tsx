import { BoxProps, Flex, Stack, Text } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import { useColorMode } from "../styles/use-color-mode"

import { clearName } from "../utils/name"
import { clearNumber, formatNumber, validateNumber } from "../utils/number"

export function useReferidosContext() {
  const [referidos, setReferidos] = useState<Referido[]>([])
  return {
    referidos,
    setReferidos,
  }
}

interface InputProps extends BoxProps {
  name: string
  label: string
}

function Input({ name, label, ...rest }: InputProps) {
  return (
    <Stack>
      <Text htmlFor={name} as="label" fontWeight="semibold">
        {label}
      </Text>
      <Flex
        as="input"
        id={name}
        name={name}
        padding="0.75rem 1rem"
        outline="none"
        {...rest}
      />
    </Stack>
  )
}

export default function () {
  const { setReferidos } = useReferidosContext()
  const { primary, secondary, color, toggleColorMode } = useColorMode()
  useEffect(toggleColorMode, [])
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const data = e.target.value.split(/\n/)
    const referidos = createReferidos(data)
    const filteredReferidos = referidos.filter((referido) => {
      return !!referido.numbers.length
    })
    setReferidos(filteredReferidos)
  }
  return (
    <Stack
      as="form"
      bg={primary}
      padding="2.25rem"
      width="22.5rem"
      sx={{
        ">*": {
          color,
        },
      }}
    >
      <Input name="name" label="Nome" bg={secondary} />
      <Input
        as="textarea"
        name="referidos"
        label="Referido"
        bg={secondary}
        onChange={(e: any) => {
          handleChange(e)
        }}
      />
    </Stack>
  )
}

class Referido {
  private _numbers: string[] = []
  constructor(public name: string) {}
  addNumber(number: string) {
    this._numbers.push(number)
  }
  get numbers() {
    return this._numbers
  }
}

function createReferidos(data: string[]) {
  const referidos: Referido[] = []
  for (const nameOrNumber of data) {
    const cleanNumber = clearNumber(nameOrNumber)
    const isItAValidNumber = validateNumber(cleanNumber)
    if (isItAValidNumber) {
      const lastReferido = referidos[referidos.length - 1]
      registerNumber(cleanNumber, lastReferido)
    } else {
      const cleanName = clearName(nameOrNumber)
      createReferido(cleanName)
    }
  }
  function registerNumber(number: string, referido: Referido) {
    if (!referido) return
    const formatedNumber = formatNumber(number)
    referido.addNumber(formatedNumber)
  }
  function createReferido(name: string) {
    if (!name) return
    const referido = new Referido(name)
    referidos.push(referido)
  }
  return referidos
}
