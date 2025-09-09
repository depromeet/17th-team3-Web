# Button Component

버튼 UI 컴포넌트.  
[class-variance-authority (cva)](https://cva.style/)를 사용하여 `theme`와 `status` 변형을 손쉽게 적용할 수 있습니다.

---

## Import

```tsx
import { Button } from '@/app/_components/ui/Button';
```

## Props

| Prop        | Type                                  | Default    | Description             |
| ----------- | ------------------------------------- | ---------- | ----------------------- |
| `children`  | `React.ReactNode`                     | –          | 버튼 내부 콘텐츠        |
| `theme`     | `"orange"` \| `"gray"`                | `"orange"` | 버튼 색상 테마          |
| `status`    | `"normal"` \| `"disabled"`            | `"normal"` | 버튼 상태 (활성/비활성) |
| `type`      | `"button"` \| `"submit"` \| `"reset"` | `"button"` | 버튼 type 속성          |
| `onClick`   | `() => void`                          | –          | 클릭 이벤트 핸들러      |
| `className` | `string`                              | –          | 추가 CSS 클래스         |
| ...rest     | `HTMLAttributes<HTMLButtonElement>`   | –          | 기본 button 속성        |

## Variants

### Theme

- **orange**: `text-white bg-orange-500 active:bg-orange-600`
- **gray**: `text-black bg-gray-200 active:bg-gray-300`

### Status

- **normal**: `hover:opacity-90`
- **disabled**: `cursor-not-allowed opacity-50`

## Usage

```tsx
// 기본 사용
<Button>기본 버튼</Button>

// 모든 props 조합 가능
<Button theme="gray" status="disabled" onClick={() => {}}>
  버튼
</Button>
```

```

## Notes

- `status="disabled"`를 주면 `disabled` 속성이 자동으로 적용됩니다.
- `className`을 전달하면 variant 스타일과 병합됩니다.
- 모든 HTML button 속성을 지원합니다.
```
