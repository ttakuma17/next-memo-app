import { memo, useState, VFC } from 'react';
import { Checkbox } from '@chakra-ui/checkbox';
import { Flex, Heading } from '@chakra-ui/layout';
import { Box, Switch } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';

import { PrimaryButton } from './PrimaryButton';
import { DeleteButton } from './DeleteButton';

type Props = {
	id: string;
	title: string;
	description: string;
	mark_div: number;
	onClick: (id: string) => void;
};

// textareaのところでWarningが出ていた
// Warning: Use the `defaultValue` or `value` props instead of setting children on <textarea>. at textarea
// 直接子要素に指定するときに起きるエラーのよう → defaultValue={description} value={description}
// ドキュメントにvalueを使うとあるので修正
// どちらでもWarningは消せたが、読み込みされない状況はよくわからないな、、、
// textareaがフォーム要素であることが関係しているか？
// https://ja.reactjs.org/docs/forms.html
// ドキュメントには独自でstateを持つと記載があるってことはFormで囲ってあげる必要があるか

export const MemoItem: VFC<Props> = memo((props) => {
	const { id, title, description, mark_div, onClick } = props;

	// stateで管理して変更可能にするため true falseへ変換する (本当は初めからtrue falseで入れたいが良い実装は検討)
	const checkedFlag = mark_div == 1 ? true : false;

	const [isSwitchOn, setIsSwitchOn] = useState<boolean>(checkedFlag);

	return (
		<>
			{isSwitchOn ?
				<Box
					pt={2}
					pl={4}
					pr={4}
					w="360px"
					h="300px"
					bg="white"
					shadow="md"
					borderRadius="md"
					_hover={{ cursor: 'pointer', opacity: 0.8 }}>
					<Flex>
						<Heading size="md" pl={1} pb={4} textColor='gray.700'>
							{title}
						</Heading>
					</Flex>
					<Textarea
						size="sm"
						resize="none"
						h="180px"
						isReadOnly={true}
						autoFocus={false}
						value={description}
						textColor='gray.700'
					></Textarea>
					<Flex pt={2} alignItems="center">
						<PrimaryButton onClick={() => onClick(id)}>更新</PrimaryButton>
						<DeleteButton id={id} />
						<Switch id='isSwitch' ml={3} isChecked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
					</Flex>
				</Box>
				:
				<Box
					pt={2}
					pl={4}
					pr={4}
					w="360px"
					h="300px"
					bg="white"
					shadow="md"
					borderRadius="md"
					_hover={{ cursor: 'pointer', opacity: 0.8 }}>
					<Flex>
						<Heading size="md" pl={1} pb={4} textColor='gray.400'>
							{title}
						</Heading>
					</Flex>
					<Textarea
						size="sm"
						resize="none"
						h="180px"
						isReadOnly={true}
						autoFocus={false}
						value={description}
						textColor='gray.400'
					></Textarea>
					<Flex pt={2} alignItems="center">
						<PrimaryButton onClick={() => onClick(id)} disabled={true}>更新</PrimaryButton>
						<DeleteButton id={id} disabled={true} />
						<Switch id='isSwitch' ml={3} isChecked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
					</Flex>
				</Box>
			}
		</>
	);
});

MemoItem.displayName = 'MemoItem';
