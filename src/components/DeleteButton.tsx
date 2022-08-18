import { Button } from '@chakra-ui/button';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/modal';
import { useState, useRef, memo, VFC } from 'react';
import { useMemoData } from '../hooks/useMemoData';
// import { Memo } from '../types/api/memo';

// Todo
// delete関数に対してidのデータを紐付ける処理を実装すれば完成となる → どういう管理方法にすべきかが定まっていないので保留とする
// 既存のライブラリで作成されたコンポーネントに自分の定義したpropsを引き渡したい、新たに追加すると型定義にありませんというエラー
// こういう場合の対処法を考える必要がある

// idが見つかりませんのエラー発生中

type Props = {
	id: string;
	disabled?: boolean;
};

export const DeleteButton: VFC<Props> = memo((props) => {
	const { id, disabled } = props;
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef<HTMLButtonElement>(null);
	const { deleteMemo } = useMemoData();

	return (
		<>
			<Button
				colorScheme="blackAlpha"
				onClick={() => {
					console.log(id); // idは取れた
					setIsOpen(true);
				}}
				disabled={disabled}
			>
				削除
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							メモデータの削除
						</AlertDialogHeader>

						<AlertDialogBody>
							本当にデータを削除しても良いですか?
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								colorScheme="blackAlpha"
								ref={cancelRef}
								onClick={onClose}>
								いいえ
							</Button>
							<Button
								colorScheme="red"
								onClick={async () => {
									await deleteMemo(id);
									onClose();
								}}
								ml={3}>
								はい
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});

DeleteButton.displayName = 'DeleteButton';
