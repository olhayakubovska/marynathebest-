import { useRef } from "react";
import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-pane/special-panel";
import { sanitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions/save-post-async";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../components/hooks/use-server";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const requestServer = useServerRequest();
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSave = () => {
    const newImageUrl = imageRef.current.value;

    const newTitle = titleRef.current.value;

    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      })
    ).then(() => navigate(`/post/${id}`));
  };

  return (
    <div className={className}>
      <Input
        ref={imageRef}
        defaultValue={imageUrl}
        placeholder="Изображение..."
      />
      <Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />

      <SpecialPanel
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={<Icon id="fa-floppy-o" size="18px" onClick={onSave} />}
      />

      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  & img {
    float: left; /* Обтекание изображения слева */
    margin: 0 20px 10px 0; /* Отступы: сверху 0, справа 20px, снизу 10px, слева 0 */
  }

  & .post-text {
    font-size: 18px; /* Размер шрифта */
    white-space: pre-line; /* Сохранение пробелов и переносов строк, как в исходном тексте */
  }
`;
