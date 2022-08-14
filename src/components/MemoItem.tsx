import { memo, VFC } from 'react';
import { Checkbox } from '@chakra-ui/checkbox';
import { Flex, Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
// import { RiGhost2Line } from 'react-icons/ri';

import { PrimaryButton } from './PrimaryButton';
// import { DeleteFunction } from './DeleteFunction';

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
	const checkedFlag = mark_div == 1 ? true : false; // stateで管理して変更可能にする

	return (
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
				<Heading size="md" pl={1} pb={4}>
					{title}
				</Heading>
			</Flex>
			<Textarea
				size="sm"
				resize="none"
				h="180px"
				isReadOnly={true}
				autoFocus={false}
				value={description}></Textarea>
			<Flex pt={2} alignItems="center">
				<PrimaryButton onClick={() => onClick(id)}>更新</PrimaryButton>
				{/* <DeleteFunction id={id} /> */}
				<Checkbox isChecked={checkedFlag} ml={3}>
					表示
				</Checkbox>
			</Flex>
		</Box>
	);
});

MemoItem.displayName = 'MemoItem';
