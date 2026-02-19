import Card from "@/components/Card";
import Button from "@/components/Button";

const charterText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc risus felis, euismod vel pretium sit amet, sodales eu leo. Nullam rhoncus fringilla elementum. Etiam volutpat placerat ante, ac mollis odio elementum ut. Vestibulum quis varius ligula. Sed pellentesque purus ac lacus convallis aliquet. Vestibulum laoreet commodo vestibulum. Morbi rutrum enim in justo viverra sollicitudin. Sed tincidunt nibh eget sapien feugiat, placerat varius nunc finibus. Curabitur lobortis sem sapien, non dapibus nunc pulvinar ut. Morbi condimentum auctor libero ac rhoncus. Cras in lectus nisl. Aenean blandit elit sed metus posuere, nec semper ex efficitur. Aliquam at bibendum mi, sed placerat nisi. Praesent cursus ut erat vel consequat. Curabitur tempor tristique dolor, et fringilla tortor. Proin condimentum sed ante in porttitor.

Proin varius erat eget erat rhoncus consectetur. Mauris ultricies risus vel sagittis lacinia. Sed at dolor non nunc vestibulum tempor. Fusce efficitur nulla eget semper scelerisque. Donec fermentum turpis a malesuada lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin vestibulum augue quis orci commodo, eget dignissim nunc consectetur. Nulla facilisi. Integer auctor odio sed justo pretium, a scelerisque enim ullamcorper.

Suspendisse potenti. Cras mollis, urna id egestas convallis, felis augue facilisis justo, eget consequat ligula sapien nec diam. Nullam tincidunt nisl vel massa venenatis, eget tincidunt urna eleifend. Fusce euismod accumsan metus, vel fermentum libero vehicula a. Praesent hendrerit odio in purus sodales, vel blandit magna aliquam.`;

export default function CharterPage() {
  return (
    <Card className="max-w-[640px]">
      <h1 className="mb-8 text-center font-heading text-3xl font-bold text-primary">
        Charte s&eacute;curit&eacute;
      </h1>

      {/* Scrollable charter text */}
      <div className="max-h-64 overflow-y-auto rounded-xl bg-input/40 p-6">
        <p className="whitespace-pre-line text-sm leading-relaxed text-primary/80">
          {charterText}
        </p>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex items-center justify-between">
        <Button href="/rules" variant="filled">
          Je refuse
        </Button>
        <Button href="/login" variant="filled">
          J&apos;accepte
        </Button>
      </div>
    </Card>
  );
}
