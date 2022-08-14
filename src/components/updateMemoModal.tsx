import React, { ChangeEvent, memo, useEffect, useState, VFC } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal';
import { Textarea } from '@chakra-ui/textarea';
import { Memo } from '../types/api/memo';
import { PrimaryButton } from './PrimaryButton';
import { useMemoData } from '../hooks/useMemoData';

// Modalに表示させる情報はtitleとdescriptionのみでよい
type Props = {
	selectedMemo: Memo | null;
	onClose: () => void;
	isOpen: boolean;
};

export const UpdateMemoModal: VFC<Props> = memo((props) => {
	// propsにmemosを渡している → updateの処理が完了すると値が変わっているはずなので再レンダリングされてほしい
	const { selectedMemo, isOpen, onClose } = props;
	console.log(selectedMemo); // データの取得はできている textareaの変更を検知してupdateMemoModalに対して再レンダリングは行われていることを確認
	const { updateMemo } = useMemoData();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		setTitle(selectedMemo?.title ?? '');
		setDescription(selectedMemo?.description ?? '');
	}, [selectedMemo]);
	// selectされたmemoを管理するstateがほしい → そのデータが変わったときに再レンダリングされるようにuseEffectを実行する
	// 依存配列にtitleとdescriptionを追加したら変更が加えられなくなったので違う
	// 更新後に関してはモーダルの画面にはAPIデータが反映されている数秒立つとgetAllmemoの関数内でエラーが起きることがある？

	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		console.log(e.target.value); // 変更の検知はできている
		setDescription(e.target.value);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			autoFocus={false}
			motionPreset="slideInBottom">
			<ModalOverlay />
			<ModalContent pb={2}>
				<ModalHeader>メモ更新</ModalHeader>
				<ModalCloseButton />
				<ModalBody mx={4}>
					<Stack spacing={4}>
						<FormControl>
							<FormLabel>タイトル</FormLabel>
							<Input value={title} onChange={onChangeTitle} />
						</FormControl>
						<FormControl>
							<FormLabel>説明</FormLabel>
							<Textarea
								size="sm"
								resize="none"
								h="180px"
								value={description}
								onChange={onChangeDescription}
							/>
						</FormControl>
					</Stack>
				</ModalBody>
				<ModalFooter>
					<PrimaryButton
						onClick={async () => {
							// メッセージが表示される前に、モーダルが閉じてしまうところは制御したい
							await updateMemo(selectedMemo?.id, title, description);
							// コンポーネントの再レンダリングが走らず、更新したのに読み込みをかけなければ画面の更新がされていない
							onClose();
						}}>
						更新
					</PrimaryButton>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
});

UpdateMemoModal.displayName = 'MemoDetailModal';
